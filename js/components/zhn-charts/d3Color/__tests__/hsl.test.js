"use strict";

var _index = require("../index");
var _asserts = require("./asserts.test");
describe('d3Color hsl', () => {
  it("hsl(…) returns an instance of hsl and color", () => {
    const c = (0, _index.hsl)(120, 0.4, 0.5);
    expect(c instanceof _index.hsl).toBe(true);
    expect(c instanceof _index.color).toBe(true);
  });
  it("hsl(…) exposes h, s, and l channel values and opacity", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("#abc"), 210, 0.25, 0.7333333, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsla(60, 100%, 20%, 0.4)"), 60, 1, 0.2, 0.4);
  });
  it("hsl.toString() converts to RGB and formats as rgb(…) or rgba(…)", () => {
    expect((0, _index.hsl)("#abcdef") + "").toBe("rgb(171, 205, 239)");
    expect((0, _index.hsl)("moccasin") + "").toBe("rgb(255, 228, 181)");
    expect((0, _index.hsl)("hsl(60, 100%, 20%)") + "").toBe("rgb(102, 102, 0)");
    expect((0, _index.hsl)("hsla(60, 100%, 20%, 0.4)") + "").toBe("rgba(102, 102, 0, 0.4)");
    expect((0, _index.hsl)("rgb(12, 34, 56)") + "").toBe("rgb(12, 34, 56)");
    expect((0, _index.hsl)((0, _index.rgb)(12, 34, 56)) + "").toBe("rgb(12, 34, 56)");
    expect((0, _index.hsl)((0, _index.hsl)(60, 1, 0.2)) + "").toBe("rgb(102, 102, 0)");
    expect((0, _index.hsl)((0, _index.hsl)(60, 1, 0.2, 0.4)) + "").toBe("rgba(102, 102, 0, 0.4)");
  });
  it("hsl.formatRgb() formats as rgb(…) or rgba(…)", () => {
    expect((0, _index.hsl)("#abcdef").formatRgb()).toBe("rgb(171, 205, 239)");
    expect((0, _index.hsl)("hsl(60, 100%, 20%)").formatRgb()).toBe("rgb(102, 102, 0)");
    expect((0, _index.hsl)("rgba(12%, 34%, 56%, 0.4)").formatRgb()).toBe("rgba(31, 87, 143, 0.4)");
    expect((0, _index.hsl)("hsla(60, 100%, 20%, 0.4)").formatRgb()).toBe("rgba(102, 102, 0, 0.4)");
  });
  it("hsl.formatHsl() formats as hsl(…) or hsla(…)", () => {
    expect((0, _index.hsl)("#abcdef").formatHsl()).toBe("hsl(210, 68%, 80.3921568627451%)");
    expect((0, _index.hsl)("hsl(60, 100%, 20%)").formatHsl()).toBe("hsl(60, 100%, 20%)");
    expect((0, _index.hsl)("rgba(12%, 34%, 56%, 0.4)").formatHsl()).toBe("hsla(210, 64.70588235294117%, 34%, 0.4)");
    expect((0, _index.hsl)("hsla(60, 100%, 20%, 0.4)").formatHsl()).toBe("hsla(60, 100%, 20%, 0.4)");
  });
  it("hsl.formatHsl() clamps to the expected range", () => {
    expect((0, _index.hsl)(180, -100, -50).formatHsl()).toBe("hsl(180, 0%, 0%)");
    expect((0, _index.hsl)(180, 150, 200).formatHsl()).toBe("hsl(180, 100%, 100%)");
    expect((0, _index.hsl)(-90, 50, 50).formatHsl()).toBe("hsl(270, 100%, 100%)");
    expect((0, _index.hsl)(420, 50, 50).formatHsl()).toBe("hsl(60, 100%, 100%)");
  });
  it("hsl.formatHex() formats as #rrggbb", () => {
    expect((0, _index.hsl)("#abcdef").formatHex()).toBe("#abcdef");
    expect((0, _index.hsl)("hsl(60, 100%, 20%)").formatHex()).toBe("#666600");
    expect((0, _index.hsl)("rgba(12%, 34%, 56%, 0.4)").formatHex()).toBe("#1f578f");
    expect((0, _index.hsl)("hsla(60, 100%, 20%, 0.4)").formatHex()).toBe("#666600");
  });
  it("hsl.toString() reflects h, s and l channel values and opacity", () => {
    const c = (0, _index.hsl)("#abc");
    c.h += 10;
    c.s += 0.01;
    c.l -= 0.01;
    c.opacity = 0.4;
    expect(c + "").toBe("rgba(166, 178, 203, 0.4)");
  });
  it("hsl.toString() treats undefined channel values as 0", () => {
    expect((0, _index.hsl)("invalid") + "").toBe("rgb(0, 0, 0)");
    expect((0, _index.hsl)("#000") + "").toBe("rgb(0, 0, 0)");
    expect((0, _index.hsl)("#ccc") + "").toBe("rgb(204, 204, 204)");
    expect((0, _index.hsl)("#fff") + "").toBe("rgb(255, 255, 255)");
    expect((0, _index.hsl)(NaN, 0.5, 0.4) + "").toBe("rgb(102, 102, 102)"); // equivalent to hsl(*, 0, 0.4)
    expect((0, _index.hsl)(120, NaN, 0.4) + "").toBe("rgb(102, 102, 102)");
    expect((0, _index.hsl)(NaN, NaN, 0.4) + "").toBe("rgb(102, 102, 102)");
    expect((0, _index.hsl)(120, 0.5, NaN) + "").toBe("rgb(0, 0, 0)"); // equivalent to hsl(120, 0.5, 0)
  });

  it("hsl.toString() treats undefined opacity as 1", () => {
    const c = (0, _index.hsl)("#abc");
    c.opacity = NaN;
    expect(c + "").toBe("rgb(170, 187, 204)");
  });
  it("hsl(h, s, l) does not wrap hue to [0,360)", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)(-10, 0.4, 0.5), -10, 0.4, 0.5, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(0, 0.4, 0.5), 0, 0.4, 0.5, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(360, 0.4, 0.5), 360, 0.4, 0.5, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(370, 0.4, 0.5), 370, 0.4, 0.5, 1);
  });
  it("hsl(h, s, l) does not clamp s and l channel values to [0,1]", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, -0.1, 0.5), 120, -0.1, 0.5, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, 1.1, 0.5), 120, 1.1, 0.5, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, 0.2, -0.1), 120, 0.2, -0.1, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, 0.2, 1.1), 120, 0.2, 1.1, 1);
  });
  it("hsl(h, s, l).clamp() clamps channel values", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, -0.1, -0.2).clamp(), 120, 0, 0, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, 1.1, 1.2).clamp(), 120, 1, 1, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, 2.1, 2.2).clamp(), 120, 1, 1, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(420, -0.1, -0.2).clamp(), 60, 0, 0, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(-420, -0.1, -0.2).clamp(), 300, 0, 0, 1);
    expect((0, _index.hsl)(-420, -0.1, -0.2, NaN).clamp().opacity).toBe(1);
    expect((0, _index.hsl)(-420, -0.1, -0.2, 0.5).clamp().opacity).toBe(0.5);
    expect((0, _index.hsl)(-420, -0.1, -0.2, -1).clamp().opacity).toBe(0);
    expect((0, _index.hsl)(-420, -0.1, -0.2, 2).clamp().opacity).toBe(1);
  });
  it("hsl(h, s, l, opacity) does not clamp opacity to [0,1]", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, 0.1, 0.5, -0.2), 120, 0.1, 0.5, -0.2);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, 0.9, 0.5, 1.2), 120, 0.9, 0.5, 1.2);
  });
  it("hsl(h, s, l) coerces channel values to numbers", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("120", ".4", ".5"), 120, 0.4, 0.5, 1);
  });
  it("hsl(h, s, l, opacity) coerces opacity to number", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, 0.1, 0.5, "0.2"), 120, 0.1, 0.5, 0.2);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(120, 0.9, 0.5, "0.9"), 120, 0.9, 0.5, 0.9);
  });
  it("hsl(h, s, l) allows undefined channel values", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(undefined, 0.4, 0.5), NaN, 0.4, 0.5, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(42, undefined, 0.5), 42, NaN, 0.5, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(42, 0.4, undefined), 42, 0.4, NaN, 1);
  });
  it("hsl(h, s, l, opacity) converts undefined opacity to 1", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)(10, 0.2, 0.3, null), 10, 0.2, 0.3, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(10, 0.2, 0.3, undefined), 10, 0.2, 0.3, 1);
  });
  it("hsl(h, s, l) preserves explicit hue, even for grays", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)(0, 0, 0), 0, 0, 0, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(42, 0, 0.5), 42, 0, 0.5, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(118, 0, 1), 118, 0, 1, 1);
  });
  it("hsl(h, s, l) preserves explicit saturation, even for white or black", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)(0, 0, 0), 0, 0, 0, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(0, 0.18, 0), 0, 0.18, 0, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(0, 0.42, 1), 0, 0.42, 1, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)(0, 1, 1), 0, 1, 1, 1);
  });
  it("hsl(format) parses the specified format and converts to HSL", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("#abcdef"), 210, 0.68, 0.8039215, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("#abc"), 210, 0.25, 0.733333333, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("rgb(12, 34, 56)"), 210, 0.647058, 0.1333333, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("rgb(12%, 34%, 56%)"), 210, 0.647058, 0.34, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsl(60,100%,20%)"), 60, 1, 0.2, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsla(60,100%,20%,0.4)"), 60, 1, 0.2, 0.4);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("aliceblue"), 208, 1, 0.9705882, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("transparent"), NaN, NaN, NaN, 0);
  });
  it("hsl(format) ignores the hue if the saturation is <= 0", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsl(120,0%,20%)"), NaN, 0, 0.2, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsl(120,-10%,20%)"), NaN, -0.1, 0.2, 1);
  });
  it("hsl(format) ignores the hue and saturation if the lightness is <= 0 or >= 1", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsl(120,20%,-10%)"), NaN, NaN, -0.1, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsl(120,20%,0%)"), NaN, NaN, 0.0, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsl(120,20%,100%)"), NaN, NaN, 1.0, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsl(120,20%,120%)"), NaN, NaN, 1.2, 1);
  });
  it("hsl(format) ignores all channels if the alpha is <= 0", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsla(120,20%,10%,0)"), NaN, NaN, NaN, 0);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsla(120,20%,10%,-0.1)"), NaN, NaN, NaN, -0.1);
  });
  it("hsl(format) does not lose precision when parsing HSL formats", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("hsl(325,50%,40%)"), 325, 0.5, 0.4, 1);
  });
  it("hsl(format) returns undefined channel values for unknown formats", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("invalid"), NaN, NaN, NaN, NaN);
  });
  it("hsl(hsl) copies an HSL color", () => {
    const c1 = (0, _index.hsl)("hsla(120,30%,50%,0.4)");
    const c2 = (0, _index.hsl)(c1);
    (0, _asserts.assertHslEqual)(c1, 120, 0.3, 0.5, 0.4);
    c1.h = c1.s = c1.l = c1.opacity = 0;
    (0, _asserts.assertHslEqual)(c1, 0, 0, 0, 0);
    (0, _asserts.assertHslEqual)(c2, 120, 0.3, 0.5, 0.4);
  });
  it("hsl(rgb) converts from RGB", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)((0, _index.rgb)(255, 0, 0, 0.4)), 0, 1, 0.5, 0.4);
  });
  it("hsl(color) returns undefined hue and zero saturation for grays (but not white and black)", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("gray"), NaN, 0, 0.5019608, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("#ccc"), NaN, 0, 0.8, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)((0, _index.rgb)("gray")), NaN, 0, 0.5019608, 1);
  });
  it("hsl(color) returns undefined hue and saturation for black and white", () => {
    (0, _asserts.assertHslEqual)((0, _index.hsl)("black"), NaN, NaN, 0, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("#000"), NaN, NaN, 0, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("white"), NaN, NaN, 1, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)("#fff"), NaN, NaN, 1, 1);
    (0, _asserts.assertHslEqual)((0, _index.hsl)((0, _index.rgb)("#fff")), NaN, NaN, 1, 1);
  });
  it("hsl(color) converts from another colorspace via rgb()", () => {
    function TestColor() {}
    TestColor.prototype = Object.create(_index.color.prototype);
    TestColor.prototype.rgb = function () {
      return (0, _index.rgb)(12, 34, 56, 0.4);
    };
    TestColor.prototype.toString = function () {
      throw new Error("should use rgb, not toString");
    };
    (0, _asserts.assertHslEqual)((0, _index.hsl)(new TestColor()), 210, 0.6470588, 0.1333334, 0.4);
  });
  it("hsl.displayable() returns true if the color is within the RGB gamut and the opacity is in [0,1]", () => {
    expect((0, _index.hsl)("white").displayable()).toBe(true);
    expect((0, _index.hsl)("red").displayable()).toBe(true);
    expect((0, _index.hsl)("black").displayable()).toBe(true);
    expect((0, _index.hsl)("invalid").displayable()).toBe(false);
    expect((0, _index.hsl)(NaN, NaN, 1).displayable()).toBe(true);
    expect((0, _index.hsl)(NaN, NaN, 1.5).displayable()).toBe(false);
    expect((0, _index.hsl)(120, -0.5, 0).displayable()).toBe(false);
    expect((0, _index.hsl)(120, 1.5, 0).displayable()).toBe(false);
    expect((0, _index.hsl)(0, 1, 1, 0).displayable()).toBe(true);
    expect((0, _index.hsl)(0, 1, 1, 1).displayable()).toBe(true);
    expect((0, _index.hsl)(0, 1, 1, -0.2).displayable()).toBe(false);
    expect((0, _index.hsl)(0, 1, 1, 1.2).displayable()).toBe(false);
  });
  it("hsl.brighter(k) returns a brighter color if k > 0", () => {
    const c = (0, _index.hsl)("rgba(165, 42, 42, 0.4)");
    (0, _asserts.assertHslEqual)(c.brighter(0.5), 0, 0.5942028, 0.4851222, 0.4);
    (0, _asserts.assertHslEqual)(c.brighter(1), 0, 0.5942028, 0.5798319, 0.4);
    (0, _asserts.assertHslEqual)(c.brighter(2), 0, 0.5942028, 0.8283313, 0.4);
  });
  it("hsl.brighter(k) returns a copy", () => {
    const c1 = (0, _index.hsl)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.brighter(1);
    (0, _asserts.assertHslEqual)(c1, 207.272727, 0.44, 0.4901961, 0.4);
    (0, _asserts.assertHslEqual)(c2, 207.272727, 0.44, 0.7002801, 0.4);
  });
  it("hsl.brighter() is equivalent to hsl.brighter(1)", () => {
    const c1 = (0, _index.hsl)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.brighter();
    const c3 = c1.brighter(1);
    (0, _asserts.assertHslEqual)(c2, c3.h, c3.s, c3.l, 0.4);
  });
  it("hsl.brighter(k) is equivalent to hsl.darker(-k)", () => {
    const c1 = (0, _index.hsl)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.brighter(1.5);
    const c3 = c1.darker(-1.5);
    (0, _asserts.assertHslEqual)(c2, c3.h, c3.s, c3.l, 0.4);
  });
  it("hsl(\"black\").brighter() still returns black", () => {
    const c1 = (0, _index.hsl)("black");
    const c2 = c1.brighter(1);
    (0, _asserts.assertHslEqual)(c1, NaN, NaN, 0, 1);
    (0, _asserts.assertHslEqual)(c2, NaN, NaN, 0, 1);
  });
  it("hsl.darker(k) returns a darker color if k > 0", () => {
    const c = (0, _index.hsl)("rgba(165, 42, 42, 0.4)");
    (0, _asserts.assertHslEqual)(c.darker(0.5), 0, 0.5942029, 0.3395855, 0.4);
    (0, _asserts.assertHslEqual)(c.darker(1), 0, 0.5942029, 0.2841176, 0.4);
    (0, _asserts.assertHslEqual)(c.darker(2), 0, 0.5942029, 0.1988823, 0.4);
  });
  it("hsl.darker(k) returns a copy", () => {
    const c1 = (0, _index.hsl)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.darker(1);
    (0, _asserts.assertHslEqual)(c1, 207.272727, 0.44, 0.4901961, 0.4);
    (0, _asserts.assertHslEqual)(c2, 207.272727, 0.44, 0.3431373, 0.4);
  });
  it("hsl.darker() is equivalent to hsl.darker(1)", () => {
    const c1 = (0, _index.hsl)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.darker();
    const c3 = c1.darker(1);
    (0, _asserts.assertHslEqual)(c2, c3.h, c3.s, c3.l, 0.4);
  });
  it("hsl.darker(k) is equivalent to hsl.brighter(-k)", () => {
    const c1 = (0, _index.hsl)("rgba(70, 130, 180, 0.4)");
    const c2 = c1.darker(1.5);
    const c3 = c1.brighter(-1.5);
    (0, _asserts.assertHslEqual)(c2, c3.h, c3.s, c3.l, 0.4);
  });
  it("hsl.rgb() converts to RGB", () => {
    const c = (0, _index.hsl)(120, 0.3, 0.5, 0.4);
    (0, _asserts.assertRgbApproxEqual)(c.rgb(), 89, 166, 89, 0.4);
  });
  it("hsl.copy(…) returns a new hsl with the specified channel values", () => {
    const c = (0, _index.hsl)(120, 0.3, 0.5, 0.4);
    expect(c.copy() instanceof _index.hsl).toBe(true);
    expect(c.copy().formatHsl()).toBe("hsla(120, 30%, 50%, 0.4)");
    expect(c.copy({
      opacity: 1
    }).formatHsl()).toBe("hsl(120, 30%, 50%)");
    expect(c.copy({
      h: 20
    }).formatHsl()).toBe("hsla(20, 30%, 50%, 0.4)");
    expect(c.copy({
      h: 20,
      s: 0.4
    }).formatHsl()).toBe("hsla(20, 40%, 50%, 0.4)");
  });
});
//# sourceMappingURL=hsl.test.js.map