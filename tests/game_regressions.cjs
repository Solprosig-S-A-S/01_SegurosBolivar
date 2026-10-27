const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const noop = () => {};

/** Creates a minimal DOM double for controller logic; it does not validate layout. */
function element() {
    const classes = new Set();
    const handlers = {};
    return {
        handlers, dataset: {}, style: { setProperty: noop, removeProperty: noop },
        classList: {
            add: (...items) => items.forEach(item => classes.add(item)),
            remove: (...items) => items.forEach(item => classes.delete(item)),
            contains: item => classes.has(item), toggle: noop
        },
        addEventListener: (type, callback) => { handlers[type] = callback; },
        setAttribute: noop, removeAttribute: noop, appendChild: noop,
        setPointerCapture: noop, releasePointerCapture: noop,
        querySelector: () => element(), querySelectorAll: () => [],
        getBoundingClientRect: () => ({ left: 100, top: 100, right: 200, bottom: 200, width: 100, height: 100 })
    };
}

/** Loads the actual inline game script without triggering its DOM-ready constructor. */
function loadGame(file, exports) {
    const nodes = new Map();
    const callbacks = new Map();
    const intervals = new Map();
    const events = {};
    let nextId = 1;
    let now = 10000;
    class TestDate extends Date { static now() { return now; } }
    const document = {
        readyState: 'loading', addEventListener: noop, body: element(),
        getElementById: id => {
            if (!nodes.has(id)) nodes.set(id, element());
            return nodes.get(id);
        },
        querySelector: () => element(), querySelectorAll: () => [], createElement: () => element()
    };
    const context = {
        console, document, Date: TestDate, navigator: {}, performance: { now: () => now },
        setTimeout: (callback, delay) => { const id = nextId++; callbacks.set(id, { callback, delay }); return id; },
        clearTimeout: id => callbacks.delete(id),
        setInterval: callback => { const id = nextId++; intervals.set(id, callback); return id; },
        clearInterval: id => intervals.delete(id), requestAnimationFrame: noop, alert: noop
    };
    context.window = { addEventListener: (type, callback) => { events[type] = callback; }, innerWidth: 1024, innerHeight: 768 };
    vm.createContext(context);
    const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const script = [...source.matchAll(/<script(?![^>]*\bdata-vendor)\b[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]).join('\n');
    vm.runInContext(`${script}\nglobalThis.exported = {${exports.join(',')}};`, context);
    return { ...context.exported, context, nodes, callbacks, intervals, events, advance: ms => { now += ms; } };
}

const audio = new Proxy({}, { get: () => noop });
const ui = () => new Proxy({ hotspots: [], actionCards: [] }, { get: (target, key) => target[key] ?? (target[key] = element()) });

test('Trasiego: two of four completed teams cannot produce a passing score', () => {
    const game = loadGame('juego3_trasiego.html', ['FieldInspectorGame']);
    const controller = Object.create(game.FieldInspectorGame.prototype);
    let result;
    Object.assign(controller, {
        audio, dom: ui(), score: 3600, timeLeft: 70, startedAt: 10000,
        completedVehicles: new Set([0, 1]), vehicles: [{}, {}, {}, {}],
        lmsBridge: { reportCompletion: score => { result = score; } }
    });
    controller.triggerAuditFinal();
    assert.equal(result, 50);
    assert.equal(controller.dom.finalStatVehicles.textContent, '2 de 4');
    assert.equal(controller.dom.finalStatTime.textContent, '00:00 min');
    controller.triggerAuditFinal();
    assert.equal(result, 50);
});

test('Trasiego: completion is recorded before transition and late callback cannot report twice', () => {
    const game = loadGame('juego3_trasiego.html', ['FieldInspectorGame']);
    const controller = Object.create(game.FieldInspectorGame.prototype);
    let reports = 0;
    Object.assign(controller, {
        audio, dom: ui(), score: 6000, timeLeft: 1, currentVehicleIndex: 3,
        completedVehicles: new Set([0, 1, 2]), vehicles: [{}, {}, {}, { name: 'Last' }],
        addScore: noop, setBotMessage: noop, showTechToast: noop,
        lmsBridge: { reportCompletion: () => { reports++; } }, attemptId: 1
    });
    controller.handleVehicleCompleted();
    assert.equal(controller.completedVehicles.size, 4);
    controller.triggerAuditFinal();
    for (const { callback } of game.callbacks.values()) callback();
    assert.equal(reports, 1);
    assert.equal(controller.currentVehicleIndex, 3);
});

module.exports = { loadGame, element, audio, ui };

function workshop(game) {
    const controller = Object.create(game.WorkshopGameController.prototype);
    Object.assign(controller, {
        audio, dom: ui(), fx: { burst: noop }, isGameActive: true, auditClosed: false,
        attemptId: 1, movementId: 0, currentZone: 1, score: 0, timeLeft: 90, streak: 0,
        equippedEPP: new Set(), trapEPP: new Set(), awardedEPP: new Set(),
        requiredEPP: ['gloves', 'goggles', 'respirator', 'boots'], checkpointApproved: false,
        tasksCompleted: { degrease: false, maintenance: false, respel: false },
        activeRespelWastes: [], respelConfined: new Set(), selectedWaste: null,
        setBotMessage: noop, showTechToast: noop, updateSlotPills: noop,
        updateScenario2Guide: noop, updateStreakDisplay: noop
    });
    return controller;
}

test('Taller: repeatedly toggling PPE awards each item only once', () => {
    const game = loadGame('juego4_taller.html', ['WorkshopGameController']);
    const controller = workshop(game);
    for (let i = 0; i < 32; i++) controller.toggleEPP('gloves', element());
    assert.equal(controller.score, 25);
    assert.equal(controller.equippedEPP.size, 0);
    assert.equal(controller.canOperate(), false);
});

test('Taller: patio requires checkpoint and PPE; changing PPE revokes authorization', () => {
    const game = loadGame('juego4_taller.html', ['WorkshopGameController']);
    const controller = workshop(game);
    controller.switchZone(2);
    assert.equal(controller.currentZone, 1);
    controller.equippedEPP = new Set(controller.requiredEPP);
    controller.checkpointApproved = true;
    assert.equal(controller.canOperate(), true);
    controller.toggleEPP('gloves', element());
    assert.equal(controller.checkpointApproved, false);
    let opened = false;
    controller.openWorkshopChallenge = () => { opened = true; };
    controller.handleDegreaseTask();
    assert.equal(opened, false);
});

test('Taller: without RESPEL score cannot pass; a complete clean attempt reaches 100', () => {
    const game = loadGame('juego4_taller.html', ['WorkshopGameController']);
    for (const complete of [false, true]) {
        const controller = workshop(game);
        controller.equippedEPP = new Set(controller.requiredEPP);
        controller.checkpointApproved = true;
        controller.activeRespelWastes = [{}, {}, {}, {}];
        controller.tasksCompleted = { degrease: true, maintenance: true, respel: complete };
        controller.score = complete ? 610 : 370;
        let score;
        controller.lmsBridge = { reportCompletion: value => { score = value; } };
        controller.triggerAuditFinal();
        assert.equal(score, complete ? 100 : 61);
        assert.equal(controller.dom.auditStatRespel.textContent, complete ? '4 de 4 Confinados' : 'Pendiente');
    }
});

test('Taller: drag and tap share bin IDs; cancellation and repeated deposits do not score', () => {
    const game = loadGame('juego4_taller.html', ['WorkshopGameController', 'RESPEL_CATALOG']);
    const controller = workshop(game);
    controller.equippedEPP = new Set(controller.requiredEPP);
    controller.checkpointApproved = true;
    const waste = Object.values(game.RESPEL_CATALOG)[0];
    controller.activeRespelWastes = [waste, {}];
    const card = element(), bin = element();
    card.dataset.waste = waste.id; bin.dataset.bin = waste.targetBin;
    game.context.document.querySelectorAll = selector => selector === '.respel-source-card' ? [card] : selector === '.respel-dest-card' ? [bin] : [];
    controller.setupRespelDragAndDrop();
    const start = () => {
        card.handlers.pointerdown({ clientX: 10, clientY: 10, pointerId: 1 });
        card.handlers.pointermove({ clientX: 150, clientY: 150 });
    };
    start();
    card.handlers.pointercancel({ type: 'pointercancel', clientX: 150, clientY: 150, pointerId: 1 });
    assert.equal(controller.score, 0);
    assert.equal(controller.respelConfined.size, 0);
    start();
    card.handlers.pointerup({ type: 'pointerup', clientX: 150, clientY: 150, pointerId: 1 });
    assert.equal(controller.score, 60);
    assert.equal(controller.respelConfined.has(waste.id), true);
    controller.selectedWaste = waste.id;
    controller.depositWasteInBin(waste.targetBin);
    assert.equal(controller.score, 60);
});

test('Taller: switching zone invalidates movement completion and its callback', () => {
    const game = loadGame('juego4_taller.html', ['WorkshopGameController']);
    const controller = workshop(game);
    controller.equippedEPP = new Set(controller.requiredEPP);
    controller.checkpointApproved = true;
    controller.avatarVestidorPos = { x: 250, y: 250 };
    controller.avatarWorkshopPos = { x: 250, y: 250 };
    let finish, actions = 0;
    game.context.window.gsap = true;
    game.context.gsap = { killTweensOf: noop, fromTo: noop, set: noop, to: (_, options) => { if (options.onComplete) finish = options.onComplete; } };
    controller.moveAvatarTo(110, 160, () => { actions++; });
    controller.switchZone(2);
    finish();
    assert.equal(actions, 0);
    assert.deepEqual(controller.avatarVestidorPos, { x: 250, y: 250 });
    assert.deepEqual(controller.avatarWorkshopPos, { x: 250, y: 250 });
});

test('SGA: repeated answers cannot score the unseen next case', () => {
    const game = loadGame('juego1_sga.html', ['SgaGameController', 'HAZARD_ITEMS', 'sound']);
    game.sound.enabled = false;
    const controller = Object.create(game.SgaGameController.prototype);
    Object.assign(controller, { currentLevel: 2, dom: {}, attemptId: 1, level2Index: 0, level2Score: 0, level2BucketCounts: { fisico: 0, salud: 0, ambiente: 0 }, renderLevel2Card: noop });
    controller.classifyLevel2Item(game.HAZARD_ITEMS[0].correctFamily);
    controller.classifyLevel2Item(game.HAZARD_ITEMS[1].correctFamily);
    assert.equal(controller.level2Index, 1);
    assert.equal(controller.level2Score, 1);
});

test('SGA: reset restores labeling phase and discards old callbacks', () => {
    const game = loadGame('juego1_sga.html', ['SgaGameController']);
    const controller = Object.create(game.SgaGameController.prototype);
    Object.assign(controller, { dom: ui(), attemptId: 1, level3Subphase: '3b', closeFds: noop, initLevel1: noop, switchLevel: noop });
    let oldActions = 0;
    controller.scheduleAction(() => { oldActions++; }, 900);
    controller.resetAll();
    for (const { callback } of game.callbacks.values()) callback();
    assert.equal(controller.level3Subphase, '3a');
    assert.equal(oldActions, 0);
});

test('Bodega: full solution passes and missing ACPM does not', () => {
    const game = loadGame('juego2_bodega.html', ['BodegaGameController', 'sound']);
    game.sound.enabled = false;
    for (const complete of [false, true]) {
        const controller = Object.create(game.BodegaGameController.prototype);
        let score;
        Object.assign(controller, { dom: ui(), fx: { confetti: noop }, rejectZone: ['item_soda'], exothermicIncidentsCount: 0,
            grid: [[complete ? 'item_acpm' : null, null, 'item_acid'], [null, 'item_pallet', 'item_extinguisher'], ['item_soda_caustic', 'item_paint', 'item_gas']],
            lmsBridge: { reportCompletion: value => { score = value; } }
        });
        controller.generateAuditReport();
        assert.equal(score, complete ? 100 : 79);
    }
});

function emergency(game) {
    const controller = Object.create(game.FirstPerson3DRoomSimulator.prototype);
    Object.assign(controller, {
        audio, dom: ui(), currentMission: 1, missionGeneration: 1, missionScores: {},
        missionStartedAt: 10000, keysPressed: {}, mission1Completed: false, mission2Completed: false,
        gameState: { hasStarted: true, isGameOver: false, hasGloves: false, hasMask: false, valveClosed: false,
            eyewashActive: false, kitOpened: false, boomPlaced: false, padsPlaced: false, respelStored: false,
            discoveredHazards: new Set(), healthO2: 100, timeLeft: 120 },
        animateHandsAction: noop, setBotMessage: noop, checkProximity: noop,
        updateMissionStepsBar: noop, updateFireNodesVisualScale: noop, updateCamera: noop,
        updateTacticalDispatchButton: noop, renderRadarBlips: noop
    });
    return controller;
}

test('Emergencias: source control and assistance cannot be skipped', () => {
    const game = loadGame('juego5_emergencias.html', ['FirstPerson3DRoomSimulator']);
    const controller = emergency(game);
    Object.assign(controller.gameState, { hasGloves: true, hasMask: true, kitOpened: true, padsPlaced: true });
    controller.gameState.activeStation = { id: 'respel' };
    controller.triggerActiveInteraction();
    assert.equal(controller.gameState.respelStored, false);
    assert.equal(controller.gameState.isGameOver, false);
    assert.equal(controller.isMissionComplete(), false);
});

test('Incendio: repeated fire interaction cannot invent equipment, alarm or blanket', () => {
    const game = loadGame('juego5_emergencias.html', ['FirstPerson3DRoomSimulator']);
    const controller = emergency(game);
    controller.currentMission = 2;
    controller.fireGearEquipped = true;
    controller.fireIntensity = 100;
    controller.fireAlarmTripped = false;
    controller.extinguisherEquipped = null;
    controller.blanketEquipped = false;
    controller.gameState.activeStation = { id: 'fire' };
    for (let i = 0; i < 5; i++) controller.triggerActiveInteraction();
    assert.equal(controller.fireIntensity, 100);
    assert.equal(controller.fireAlarmTripped, false);
    assert.equal(controller.extinguisherEquipped, null);
    Object.assign(controller, { fireIntensity: 0, fireAlarmTripped: true, extinguisherEquipped: 'pqs', pinPulled: true });
    controller.triggerActiveInteraction();
    assert.equal(controller.blanketEquipped, false);
    assert.equal(controller.gameState.isGameOver, false);
});

test('Emergencias: valid two-mission route reports only once after both missions', () => {
    const game = loadGame('juego5_emergencias.html', ['FirstPerson3DRoomSimulator']);
    const controller = emergency(game);
    const reports = [];
    controller.lmsBridge = { reportCompletion: (score, details) => reports.push({ score, details }) };
    const interact = id => { controller.gameState.activeStation = { id }; controller.triggerActiveInteraction(); };
    for (const id of ['epp', 'valve', 'eyewash', 'kit', 'spill', 'spill', 'respel']) interact(id);
    assert.equal(controller.mission1Completed, true);
    assert.equal(reports.length, 0);
    assert.equal(controller.switchMission(2, true), true);
    controller.gameState.isGameOver = false;
    controller.startCrisisLoop();
    for (const id of ['fire_gear', 'fire_alarm', 'extinguisher', 'extinguisher', 'fire', 'fire', 'fire', 'fire', 'fire_blanket', 'fire']) interact(id);
    assert.equal(controller.mission2Completed, true);
    assert.equal(reports.length, 1);
    assert.equal(reports[0].score, 90);
    assert.equal(reports[0].details.prerequisitesMet, true);
    controller.triggerGameOver(true);
    assert.equal(reports.length, 1);
    assert.equal(game.intervals.size, 0);
});

test('Emergencias: tabs cannot refill resources and timer is unique and uses elapsed time', () => {
    const game = loadGame('juego5_emergencias.html', ['FirstPerson3DRoomSimulator']);
    const controller = emergency(game);
    controller.gameState.timeLeft = 100;
    controller.gameState.healthO2 = 45;
    assert.equal(controller.switchMission(1), false);
    assert.equal(controller.gameState.healthO2, 45);
    controller.gameState.boomPlaced = true;
    controller.startCrisisLoop();
    controller.startCrisisLoop();
    assert.equal(game.intervals.size, 1);
    game.advance(5000);
    for (const callback of game.intervals.values()) callback();
    assert.equal(controller.gameState.timeLeft, 95);
});

test('FPS: equal time gives equal speed at 60/120 Hz and diagonal movement is normalized', () => {
    const travel = (frames, diagonal) => {
        const game = loadGame('juego5_emergencias.html', ['FirstPerson3DRoomSimulator']);
        const controller = emergency(game);
        Object.assign(controller, { posX: 0, posZ: 0, yaw: 0, stepCounter: 0 });
        controller.keysPressed = diagonal ? { KeyW: true, KeyD: true } : { KeyW: true };
        let frame;
        game.context.requestAnimationFrame = callback => { frame = callback; };
        controller.startPhysicsLoop();
        for (let i = 0; i <= frames; i++) frame(i * 200 / frames);
        return Math.hypot(controller.posX, controller.posZ);
    };
    assert.ok(Math.abs(travel(12, false) - travel(24, false)) < 0.0001);
    assert.ok(Math.abs(travel(12, true) - travel(12, false)) < 0.0001);
});

test('LMS: reopening passed attempts preserves completion; review mode writes nothing', () => {
    for (const readOnly of [false, true]) {
        const game = loadGame('juego1_sga.html', ['BolivarLmsBridge']);
        const writes = [];
        game.context.window.API = {
            LMSInitialize: () => 'true', LMSGetValue: key => key === 'cmi.core.lesson_mode' ? (readOnly ? 'review' : 'normal') : key === 'cmi.core.lesson_status' ? 'passed' : '',
            LMSSetValue: (key, value) => { writes.push([key, value]); return 'true'; }, LMSCommit: () => 'true'
        };
        const bridge = new game.BolivarLmsBridge('test');
        assert.equal(writes.some(([key]) => key === 'cmi.core.lesson_status'), false);
        if (readOnly) {
            bridge.reportCompletion(0);
            assert.deepEqual(writes, []);
        }
    }
});

test('LMS: false returns are surfaced and mandatory prerequisites override score', () => {
    const game = loadGame('juego1_sga.html', ['BolivarLmsBridge']);
    game.context.console = { info: noop, warn: noop };
    let reject = false;
    const writes = [];
    game.context.window.API = {
        LMSInitialize: () => true, LMSGetValue: () => '',
        LMSSetValue: (key, value) => { writes.push([key, value]); return !reject; }, LMSCommit: () => true
    };
    const bridge = new game.BolivarLmsBridge('test');
    const partial = bridge.reportCompletion(100, { prerequisitesMet: false });
    assert.equal(partial.passed, false);
    assert.equal(partial.saved, true);
    assert.deepEqual(writes.at(-1), ['cmi.core.lesson_status', 'failed']);
    reject = true;
    const failedSave = bridge.reportCompletion(100);
    assert.equal(failedSave.saved, false);
    assert.match(game.nodes.get('lms-save-status').textContent, /No se pudo guardar/);
});

test('LMS 2004: successful completion writes score and both completion statuses', () => {
    const game = loadGame('juego1_sga.html', ['BolivarLmsBridge']);
    const writes = [];
    game.context.window.API_1484_11 = {
        Initialize: () => 'true', GetValue: () => '',
        SetValue: (key, value) => { writes.push([key, value]); return 'true'; }, Commit: () => 'true'
    };
    const bridge = new game.BolivarLmsBridge('test');
    const result = bridge.reportCompletion(90);
    assert.equal(result.saved, true);
    assert.ok(writes.some(([key, value]) => key === 'cmi.score.scaled' && value === '0.90'));
    assert.ok(writes.some(([key, value]) => key === 'cmi.success_status' && value === 'passed'));
    assert.ok(writes.some(([key, value]) => key === 'cmi.completion_status' && value === 'completed'));
});

test('SGA: focused FDS buttons are disabled while feedback is pending', () => {
    const game = loadGame('juego1_sga.html', ['SgaGameController', 'sound', 'FDS_SITUATIONAL_QUESTIONS']);
    game.sound.enabled = false;
    const button = element();
    const controller = Object.create(game.SgaGameController.prototype);
    Object.assign(controller, {
        dom: ui(), currentLevel: 3, attemptId: 1, fdsIndex: 0, fdsScore: 0, fdsAnswersLog: [],
        fx: { confetti: noop }, getCenterInViewport: () => ({ x: 0, y: 0 }), showComicBubble: noop
    });
    controller.dom.fdsNavGrid.querySelectorAll = () => [button];
    controller.handleFdsSectionSelection(game.FDS_SITUATIONAL_QUESTIONS[0].correctSection, button);
    controller.handleFdsSectionSelection(game.FDS_SITUATIONAL_QUESTIONS[1].correctSection, button);
    assert.equal(controller.fdsIndex, 1);
    assert.equal(button.disabled, true);
});

test('FPS: blur releases held keys and crisis tick evaluates exposure even while stationary', () => {
    const game = loadGame('juego5_emergencias.html', ['FirstPerson3DRoomSimulator']);
    const controller = emergency(game);
    controller.bindKeyboardControls();
    game.events.keydown({ target: { closest: () => null }, code: 'KeyW', key: 'w' });
    assert.equal(controller.keysPressed.KeyW, true);
    game.events.blur();
    assert.equal(Object.keys(controller.keysPressed).length, 0);
    let exposures = 0;
    controller.checkProximity = () => { exposures++; };
    controller.gameState.boomPlaced = true;
    controller.startCrisisLoop();
    game.advance(1000);
    for (const callback of game.intervals.values()) callback();
    assert.equal(exposures, 1);
});

test('Accessibility: custom controls activate by keyboard; dialogs trap and restore focus', () => {
    const game = loadGame('juego1_sga.html', ['setupGameAccessibility']);
    const document = game.context.document;
    const listeners = {};
    let observer, open = true, activations = 0;
    const accessibleElement = () => {
        const node = element(), attributes = new Map();
        node.isConnected = true;
        node.textContent = 'Control';
        node.setAttribute = (key, value) => attributes.set(key, value);
        node.getAttribute = key => attributes.get(key) ?? null;
        node.hasAttribute = key => attributes.has(key);
        node.closest = () => null;
        node.getClientRects = () => [{}];
        node.focus = () => { document.activeElement = node; };
        return node;
    };
    const opener = accessibleElement(), first = accessibleElement(), last = accessibleElement();
    const control = accessibleElement(), dialog = accessibleElement();
    control.dispatchEvent = () => { activations++; };
    dialog.querySelectorAll = () => [first, last];
    dialog.querySelector = () => ({ textContent: 'Dialog' });
    document.activeElement = opener;
    document.querySelectorAll = selector => selector.startsWith('.patch-card') ? [control] : selector.startsWith('.modal-overlay') ? (open ? [dialog] : []) : [];
    document.addEventListener = (type, callback) => { listeners[type] = callback; };
    game.context.getComputedStyle = () => ({ display: 'block', visibility: 'visible', opacity: '1' });
    game.context.MutationObserver = class { constructor(callback) { observer = callback; } observe() {} };
    game.context.MouseEvent = class { constructor(type) { this.type = type; } };
    game.setupGameAccessibility();
    assert.equal(document.activeElement, first);
    assert.equal(control.getAttribute('role'), 'button');
    document.activeElement = last;
    listeners.keydown({ key: 'Tab', shiftKey: false, preventDefault: noop, stopPropagation: noop });
    assert.equal(document.activeElement, first);
    listeners.keydown({ key: 'Enter', target: { closest: () => control }, preventDefault: noop, stopPropagation: noop });
    assert.equal(activations, 1);
    open = false;
    observer([{ type: 'childList' }]);
    assert.equal(document.activeElement, opener);
});

test('Emergencias: compact HUD works without radar, detector, mission tabs or step index', () => {
    const game = loadGame('juego5_emergencias.html', ['FirstPerson3DRoomSimulator']);
    const controller = emergency(game);
    Object.assign(controller, { posX: 0, posZ: 70, pitch: 0, yaw: 0, stepCounter: 0, stations: [], lastDamageTime: 0 });
    Object.assign(controller.dom, { radarDot: null, radarCone: null, radarBlips: null, gasReading: null, missionStepsBar: null, btnMission1: null, btnMission2: null });
    let objectives = 0;
    controller.updateObjectiveGuide = () => { objectives++; };
    controller.checkProximity = game.FirstPerson3DRoomSimulator.prototype.checkProximity;
    game.FirstPerson3DRoomSimulator.prototype.updateCamera.call(controller);
    assert.equal(controller.gameState.healthO2, 90);
    game.FirstPerson3DRoomSimulator.prototype.updateMissionStepsBar.call(controller);
    assert.equal(objectives, 2);
    const source = fs.readFileSync(path.join(__dirname, '..', 'juego5_emergencias.html'), 'utf8');
    for (const id of ['gas-reading', 'btn-mission-1', 'btn-mission-2', 'radar-blips-container', 'radar-player-dot', 'hud-mission-steps-bar']) {
        assert.equal(source.includes(`id="${id}"`), false, id);
    }
    for (const id of ['timer-digits', 'btn-sound-toggle', 'btn-moodle-fullscreen']) assert.ok(source.includes(`id="${id}"`));
});
