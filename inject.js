//UserScript
'use strict'
var html

fetch('https://llsccm.github.io/sgstools/iframe.html')
  .then((res) => res.text())
  .then((data) => {
    html = data
  })

window.WDVerSion = '1.0.0'
;(function () {
  let iframe = document.createElement('iframe')
  document.body.appendChild(iframe)
  iframe.frameBorder = 0
  window.console = iframe.contentWindow.console
  iframe = null
})()
var card = {}
var mySkin
var isSelectGeneral = false
var GuoZhanGeneral = []

let UserID
let curUserID
let oldGeneralID = 999 ////只有不同GeneralID才会更新skinFrame
let GeneralID = 999
let isFirstTime = true //第一次不会弹出skin窗口，只有oldGeneralID != GeneralID 时（新一局游戏）， 才会 isFirstTime = true；新一局游戏开始重置

let GuoZhanBiaoZhun = {
  0: { cardName: '?', color: '', number: '', type: '' },
  1001: { cardName: '决斗', color: '3', number: 1, type: '2' },
  1002: { cardName: '闪电', color: '3', number: 1, type: '2' },
  1003: { cardName: '八卦', color: '3', number: 2, type: '3' },
  1004: { cardName: '雌雄', color: '3', number: 2, type: '3' },
  1005: { cardName: '寒冰', color: '3', number: 2, type: '3' },
  1006: { cardName: '顺手', color: '3', number: 3, type: '2' },
  1007: { cardName: '过拆', color: '3', number: 3, type: '2' },
  1008: { cardName: '顺手', color: '3', number: 4, type: '2' },
  1009: { cardName: '过拆', color: '3', number: 4, type: '2' },
  1010: { cardName: '绝影', color: '3', number: 5, type: '3' },
  1011: { cardName: '杀', color: '3', number: 5, type: '1' },
  1012: { cardName: '青釭', color: '3', number: 6, type: '3' },
  1013: { cardName: '雷杀', color: '3', number: 6, type: '1' },
  1014: { cardName: '杀', color: '3', number: 7, type: '1' },
  1015: { cardName: '雷杀', color: '3', number: 7, type: '1' },
  1016: { cardName: '杀', color: '3', number: 8, type: '1' },
  1017: { cardName: '杀', color: '3', number: 8, type: '1' },
  1018: { cardName: '酒', color: '3', number: 9, type: '1' },
  1019: { cardName: '杀', color: '3', number: 9, type: '1' },
  1020: { cardName: '杀', color: '3', number: 10, type: '1' },
  1021: { cardName: '兵', color: '3', number: 10, type: '2' },
  1022: { cardName: '杀', color: '3', number: 11, type: '1' },
  1023: { cardName: '无懈', color: '3', number: 11, type: '2' },
  1024: { cardName: '铁索', color: '3', number: 12, type: '2' },
  1025: { cardName: '丈八', color: '3', number: 12, type: '3' },
  1026: { cardName: '南蛮', color: '3', number: 13, type: '2' },
  1027: { cardName: '大宛', color: '3', number: 13, type: '3' },
  1028: { cardName: '桃园', color: '1', number: 1, type: '2' },
  1029: { cardName: '万箭', color: '1', number: 1, type: '2' },
  1030: { cardName: '闪', color: '1', number: 2, type: '1' },
  1031: { cardName: '火攻', color: '1', number: 2, type: '2' },
  1032: { cardName: '五谷', color: '1', number: 3, type: '2' },
  1033: { cardName: '火攻', color: '1', number: 3, type: '2' },
  1034: { cardName: '火杀', color: '1', number: 4, type: '1' },
  1035: { cardName: '桃', color: '1', number: 4, type: '1' },
  1036: { cardName: '赤兔', color: '1', number: 5, type: '3' },
  1037: { cardName: '麒麟', color: '1', number: 5, type: '3' },
  1038: { cardName: '乐', color: '1', number: 6, type: '2' },
  1039: { cardName: '桃', color: '1', number: 6, type: '1' },
  1040: { cardName: '无中', color: '1', number: 7, type: '2' },
  1041: { cardName: '桃', color: '1', number: 7, type: '1' },
  1042: { cardName: '无中', color: '1', number: 8, type: '2' },
  1043: { cardName: '桃', color: '1', number: 8, type: '1' },
  1044: { cardName: '远交', color: '1', number: 9, type: '2' },
  1045: { cardName: '桃', color: '1', number: 9, type: '1' },
  1046: { cardName: '杀', color: '1', number: 10, type: '1' },
  1047: { cardName: '桃', color: '1', number: 10, type: '1' },
  1048: { cardName: '逸劳', color: '1', number: 11, type: '2' },
  1049: { cardName: '闪', color: '1', number: 11, type: '1' },
  1050: { cardName: '杀', color: '1', number: 12, type: '1' },
  1051: { cardName: '桃', color: '1', number: 12, type: '1' },
  1052: { cardName: '过拆', color: '1', number: 12, type: '2' },
  1053: { cardName: '闪', color: '1', number: 13, type: '1' },
  1054: { cardName: '爪黄', color: '1', number: 13, type: '3' },
  1055: { cardName: '决斗', color: '4', number: 1, type: '2' },
  1056: { cardName: '白银', color: '4', number: 1, type: '3' },
  1057: { cardName: '藤甲', color: '4', number: 2, type: '3' },
  1058: { cardName: '杀', color: '4', number: 2, type: '1' },
  1059: { cardName: '仁王', color: '4', number: 2, type: '3' },
  1060: { cardName: '杀', color: '4', number: 3, type: '1' },
  1061: { cardName: '知己', color: '4', number: 3, type: '2' },
  1062: { cardName: '杀', color: '4', number: 4, type: '1' },
  1063: { cardName: '知己', color: '4', number: 4, type: '2' },
  1064: { cardName: '杀', color: '4', number: 5, type: '1' },
  1065: { cardName: '的卢', color: '4', number: 5, type: '3' },
  1066: { cardName: '乐', color: '4', number: 6, type: '2' },
  1067: { cardName: '雷杀', color: '4', number: 6, type: '1' },
  1068: { cardName: '南蛮', color: '4', number: 7, type: '2' },
  1069: { cardName: '雷杀', color: '4', number: 7, type: '1' },
  1070: { cardName: '杀', color: '4', number: 8, type: '1' },
  1071: { cardName: '雷杀', color: '4', number: 8, type: '1' },
  1072: { cardName: '酒', color: '4', number: 9, type: '1' },
  1073: { cardName: '杀', color: '4', number: 9, type: '1' },
  1074: { cardName: '兵', color: '4', number: 10, type: '2' },
  1075: { cardName: '杀', color: '4', number: 10, type: '1' },
  1076: { cardName: '杀', color: '4', number: 11, type: '1' },
  1077: { cardName: '杀', color: '4', number: 11, type: '1' },
  1078: { cardName: '铁索', color: '4', number: 12, type: '2' },
  1079: { cardName: '借刀', color: '4', number: 12, type: '2' },
  1080: { cardName: '铁索', color: '4', number: 13, type: '2' },
  1081: { cardName: '国无', color: '4', number: 13, type: '2' },
  1082: { cardName: '连弩', color: '2', number: 1, type: '3' },
  1083: { cardName: '朱雀', color: '2', number: 1, type: '3' },
  1084: { cardName: '桃', color: '2', number: 2, type: '1' },
  1085: { cardName: '闪', color: '2', number: 2, type: '1' },
  1086: { cardName: '顺手', color: '2', number: 3, type: '2' },
  1087: { cardName: '闪', color: '2', number: 3, type: '1' },
  1088: { cardName: '逸劳', color: '2', number: 4, type: '2' },
  1089: { cardName: '火杀', color: '2', number: 4, type: '1' },
  1090: { cardName: '贯石', color: '2', number: 5, type: '3' },
  1091: { cardName: '火杀', color: '2', number: 5, type: '1' },
  1092: { cardName: '吴六', color: '2', number: 6, type: '3' },
  1093: { cardName: '闪', color: '2', number: 6, type: '1' },
  1094: { cardName: '闪', color: '2', number: 7, type: '1' },
  1095: { cardName: '闪', color: '2', number: 7, type: '1' },
  1096: { cardName: '闪', color: '2', number: 8, type: '1' },
  1097: { cardName: '闪', color: '2', number: 8, type: '1' },
  1098: { cardName: '酒', color: '2', number: 9, type: '1' },
  1099: { cardName: '闪', color: '2', number: 9, type: '1' },
  1100: { cardName: '杀', color: '2', number: 10, type: '1' },
  1101: { cardName: '闪', color: '2', number: 10, type: '1' },
  1102: { cardName: '杀', color: '2', number: 11, type: '1' },
  1103: { cardName: '闪', color: '2', number: 11, type: '1' },
  1104: { cardName: '杀', color: '2', number: 12, type: '1' },
  1105: { cardName: '三尖', color: '2', number: 12, type: '3' },
  1106: { cardName: '国无', color: '2', number: 12, type: '2' },
  1107: { cardName: '紫骍', color: '2', number: 13, type: '3' },
  1108: { cardName: '闪', color: '2', number: 13, type: '1' },
  1148: { cardName: '玉玺', color: '4', number: 1, type: '1' },
  1150: { cardName: '敕令', color: '4', number: 3, type: '1' }
}

let JunZhengBiaoZhun = {
  0: { color: '', cardName: '?', number: '', type: '' },
  1: { color: '2', cardName: '决斗', number: 1, type: '2' },
  2: { color: '2', cardName: '闪', number: 2, type: '1' },
  3: { color: '2', cardName: '顺手', number: 3, type: '2' },
  4: { color: '2', cardName: '顺手', number: 4, type: '2' },
  5: { color: '2', cardName: '贯石', number: 5, type: '3' },
  6: { color: '2', cardName: '杀', number: 6, type: '1' },
  7: { color: '2', cardName: '杀', number: 7, type: '1' },
  8: { color: '2', cardName: '杀', number: 8, type: '1' },
  9: { color: '2', cardName: '杀', number: 9, type: '1' },
  10: { color: '2', cardName: '杀', number: 10, type: '1' },
  11: { color: '2', cardName: '闪', number: 11, type: '1' },
  12: { color: '2', cardName: '方天', number: 12, type: '3' },
  13: { color: '2', cardName: '紫骍', number: 13, type: '3' },
  14: { color: '2', cardName: '连弩', number: 1, type: '3' },
  15: { color: '2', cardName: '闪', number: 2, type: '1' },
  16: { color: '2', cardName: '闪', number: 3, type: '1' },
  17: { color: '2', cardName: '闪', number: 4, type: '1' },
  18: { color: '2', cardName: '闪', number: 5, type: '1' },
  19: { color: '2', cardName: '闪', number: 6, type: '1' },
  20: { color: '2', cardName: '闪', number: 7, type: '1' },
  21: { color: '2', cardName: '闪', number: 8, type: '1' },
  22: { color: '2', cardName: '闪', number: 9, type: '1' },
  23: { color: '2', cardName: '闪', number: 10, type: '1' },
  24: { color: '2', cardName: '闪', number: 11, type: '1' },
  25: { color: '2', cardName: '桃', number: 12, type: '1' },
  26: { color: '2', cardName: '杀', number: 13, type: '1' },
  27: { color: '1', cardName: '万箭', number: 1, type: '2' },
  28: { color: '1', cardName: '闪', number: 2, type: '1' },
  29: { color: '1', cardName: '五谷', number: 3, type: '2' },
  30: { color: '1', cardName: '五谷', number: 4, type: '2' },
  31: { color: '1', cardName: '赤兔', number: 5, type: '3' },
  32: { color: '1', cardName: '乐', number: 6, type: '2' },
  33: { color: '1', cardName: '无中', number: 7, type: '2' },
  34: { color: '1', cardName: '无中', number: 8, type: '2' },
  35: { color: '1', cardName: '无中', number: 9, type: '2' },
  36: { color: '1', cardName: '杀', number: 10, type: '1' },
  37: { color: '1', cardName: '无中', number: 11, type: '2' },
  38: { color: '1', cardName: '过拆', number: 12, type: '2' },
  39: { color: '1', cardName: '闪', number: 13, type: '1' },
  40: { color: '1', cardName: '桃园', number: 1, type: '2' },
  41: { color: '1', cardName: '闪', number: 2, type: '1' },
  42: { color: '1', cardName: '桃', number: 3, type: '1' },
  43: { color: '1', cardName: '桃', number: 4, type: '1' },
  44: { color: '1', cardName: '麒麟', number: 5, type: '3' },
  45: { color: '1', cardName: '桃', number: 6, type: '1' },
  46: { color: '1', cardName: '桃', number: 7, type: '1' },
  47: { color: '1', cardName: '桃', number: 8, type: '1' },
  48: { color: '1', cardName: '桃', number: 9, type: '1' },
  49: { color: '1', cardName: '杀', number: 10, type: '1' },
  50: { color: '1', cardName: '杀', number: 11, type: '1' },
  51: { color: '1', cardName: '桃', number: 12, type: '1' },
  52: { color: '1', cardName: '爪黄', number: 13, type: '3' },
  53: { color: '4', cardName: '决斗', number: 1, type: '2' },
  54: { color: '4', cardName: '杀', number: 2, type: '1' },
  55: { color: '4', cardName: '杀', number: 3, type: '1' },
  56: { color: '4', cardName: '杀', number: 4, type: '1' },
  57: { color: '4', cardName: '杀', number: 5, type: '1' },
  58: { color: '4', cardName: '杀', number: 6, type: '1' },
  59: { color: '4', cardName: '杀', number: 7, type: '1' },
  60: { color: '4', cardName: '杀', number: 8, type: '1' },
  61: { color: '4', cardName: '杀', number: 9, type: '1' },
  62: { color: '4', cardName: '杀', number: 10, type: '1' },
  63: { color: '4', cardName: '杀', number: 11, type: '1' },
  64: { color: '4', cardName: '无懈', number: 12, type: '2' },
  65: { color: '4', cardName: '无懈', number: 13, type: '2' },
  66: { color: '4', cardName: '连弩', number: 1, type: '3' },
  67: { color: '4', cardName: '八卦', number: 2, type: '3' },
  68: { color: '4', cardName: '过拆', number: 3, type: '2' },
  69: { color: '4', cardName: '过拆', number: 4, type: '2' },
  70: { color: '4', cardName: '的卢', number: 5, type: '3' },
  71: { color: '4', cardName: '乐', number: 6, type: '2' },
  72: { color: '4', cardName: '南蛮', number: 7, type: '2' },
  73: { color: '4', cardName: '杀', number: 8, type: '1' },
  74: { color: '4', cardName: '杀', number: 9, type: '1' },
  75: { color: '4', cardName: '杀', number: 10, type: '1' },
  76: { color: '4', cardName: '杀', number: 11, type: '1' },
  77: { color: '4', cardName: '借刀', number: 12, type: '2' },
  78: { color: '4', cardName: '借刀', number: 13, type: '2' },
  79: { color: '3', cardName: '决斗', number: 1, type: '2' },
  80: { color: '3', cardName: '雌雄', number: 2, type: '3' },
  81: { color: '3', cardName: '顺手', number: 3, type: '2' },
  82: { color: '3', cardName: '顺手', number: 4, type: '2' },
  83: { color: '3', cardName: '绝影', number: 5, type: '3' },
  84: { color: '3', cardName: '青釭', number: 6, type: '3' },
  85: { color: '3', cardName: '杀', number: 7, type: '1' },
  86: { color: '3', cardName: '杀', number: 8, type: '1' },
  87: { color: '3', cardName: '杀', number: 9, type: '1' },
  88: { color: '3', cardName: '杀', number: 10, type: '1' },
  89: { color: '3', cardName: '顺手', number: 11, type: '2' },
  90: { color: '3', cardName: '过拆', number: 12, type: '2' },
  91: { color: '3', cardName: '南蛮', number: 13, type: '2' },
  92: { color: '3', cardName: '闪电', number: 1, type: '2' },
  93: { color: '3', cardName: '八卦', number: 2, type: '3' },
  94: { color: '3', cardName: '过拆', number: 3, type: '2' },
  95: { color: '3', cardName: '过拆', number: 4, type: '2' },
  96: { color: '3', cardName: '青龙', number: 5, type: '3' },
  97: { color: '3', cardName: '乐', number: 6, type: '2' },
  98: { color: '3', cardName: '南蛮', number: 7, type: '2' },
  99: { color: '3', cardName: '杀', number: 8, type: '1' },
  100: { color: '3', cardName: '杀', number: 9, type: '1' },
  101: { color: '3', cardName: '杀', number: 10, type: '1' },
  102: { color: '3', cardName: '无懈', number: 11, type: '2' },
  103: { color: '3', cardName: '丈八', number: 12, type: '3' },
  104: { color: '3', cardName: '大宛', number: 13, type: '3' },
  105: { color: '1', cardName: '闪电', number: 12, type: '2' },
  106: { color: '2', cardName: '无懈', number: 12, type: '2' },
  107: { color: '4', cardName: '仁王', number: 2, type: '3' },
  108: { color: '3', cardName: '寒冰', number: 2, type: '3' },
  109: { color: '1', cardName: '无懈', number: 1, type: '2' },
  110: { color: '1', cardName: '火攻', number: 2, type: '2' },
  111: { color: '1', cardName: '火攻', number: 3, type: '2' },
  112: { color: '1', cardName: '火杀', number: 4, type: '1' },
  113: { color: '1', cardName: '桃', number: 5, type: '1' },
  114: { color: '1', cardName: '桃', number: 6, type: '1' },
  115: { color: '1', cardName: '火杀', number: 7, type: '1' },
  116: { color: '1', cardName: '闪', number: 8, type: '1' },
  117: { color: '1', cardName: '闪', number: 9, type: '1' },
  118: { color: '1', cardName: '火杀', number: 10, type: '1' },
  119: { color: '1', cardName: '闪', number: 11, type: '1' },
  120: { color: '1', cardName: '闪', number: 12, type: '1' },
  121: { color: '1', cardName: '无懈', number: 13, type: '2' },
  122: { color: '2', cardName: '朱雀', number: 1, type: '3' },
  123: { color: '2', cardName: '桃', number: 2, type: '1' },
  124: { color: '2', cardName: '桃', number: 3, type: '1' },
  125: { color: '2', cardName: '火杀', number: 4, type: '1' },
  126: { color: '2', cardName: '火杀', number: 5, type: '1' },
  127: { color: '2', cardName: '闪', number: 6, type: '1' },
  128: { color: '2', cardName: '闪', number: 7, type: '1' },
  129: { color: '2', cardName: '闪', number: 8, type: '1' },
  130: { color: '2', cardName: '酒', number: 9, type: '1' },
  131: { color: '2', cardName: '闪', number: 10, type: '1' },
  132: { color: '2', cardName: '闪', number: 11, type: '1' },
  133: { color: '2', cardName: '火攻', number: 12, type: '2' },
  134: { color: '2', cardName: '骅骝', number: 13, type: '3' },
  135: { color: '3', cardName: '古锭', number: 1, type: '3' },
  136: { color: '3', cardName: '藤甲', number: 2, type: '3' },
  137: { color: '3', cardName: '酒', number: 3, type: '1' },
  138: { color: '3', cardName: '雷杀', number: 4, type: '1' },
  139: { color: '3', cardName: '雷杀', number: 5, type: '1' },
  140: { color: '3', cardName: '雷杀', number: 6, type: '1' },
  141: { color: '3', cardName: '雷杀', number: 7, type: '1' },
  142: { color: '3', cardName: '雷杀', number: 8, type: '1' },
  143: { color: '3', cardName: '酒', number: 9, type: '1' },
  144: { color: '3', cardName: '兵', number: 10, type: '2' },
  145: { color: '3', cardName: '铁索', number: 11, type: '2' },
  146: { color: '3', cardName: '铁索', number: 12, type: '2' },
  147: { color: '3', cardName: '无懈', number: 13, type: '2' },
  148: { color: '4', cardName: '白银', number: 1, type: '3' },
  149: { color: '4', cardName: '藤甲', number: 2, type: '3' },
  150: { color: '4', cardName: '酒', number: 3, type: '1' },
  151: { color: '4', cardName: '兵', number: 4, type: '2' },
  152: { color: '4', cardName: '雷杀', number: 5, type: '1' },
  153: { color: '4', cardName: '雷杀', number: 6, type: '1' },
  154: { color: '4', cardName: '雷杀', number: 7, type: '1' },
  155: { color: '4', cardName: '雷杀', number: 8, type: '1' },
  156: { color: '4', cardName: '酒', number: 9, type: '1' },
  157: { color: '4', cardName: '铁索', number: 10, type: '2' },
  158: { color: '4', cardName: '铁索', number: 11, type: '2' },
  159: { color: '4', cardName: '铁索', number: 12, type: '2' },
  160: { color: '4', cardName: '铁索', number: 13, type: '2' },
  161: { color: '2', cardName: '木马', number: 5, type: '3' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' }
}

let JunZhengBiaoZhunShanShan = {
  0: { color: '', cardName: '?', number: '', type: '' },
  1: { color: '2', cardName: '决斗', number: 1, type: '2' },
  2: { color: '2', cardName: '闪', number: 2, type: '1' },
  3: { color: '2', cardName: '顺手', number: 3, type: '2' },
  4: { color: '2', cardName: '顺手', number: 4, type: '2' },
  5: { color: '2', cardName: '贯石', number: 5, type: '3' },
  6: { color: '2', cardName: '杀', number: 6, type: '1' },
  7: { color: '2', cardName: '杀', number: 7, type: '1' },
  8: { color: '2', cardName: '杀', number: 8, type: '1' },
  9: { color: '2', cardName: '杀', number: 9, type: '1' },
  10: { color: '2', cardName: '杀', number: 10, type: '1' },
  11: { color: '2', cardName: '闪', number: 11, type: '1' },
  12: { color: '2', cardName: '方天', number: 12, type: '3' },
  13: { color: '2', cardName: '紫骍', number: 13, type: '3' },
  14: { color: '2', cardName: '连弩', number: 1, type: '3' },
  15: { color: '2', cardName: '闪', number: 2, type: '1' },
  12140: { color: '2', cardName: '闪', number: 3, type: '1' },
  17: { color: '2', cardName: '闪', number: 4, type: '1' },
  12141: { color: '2', cardName: '闪', number: 5, type: '1' },
  12142: { color: '2', cardName: '闪', number: 6, type: '1' },
  20: { color: '2', cardName: '闪', number: 7, type: '1' },
  21: { color: '2', cardName: '闪', number: 8, type: '1' },
  22: { color: '2', cardName: '闪', number: 9, type: '1' },
  23: { color: '2', cardName: '闪', number: 10, type: '1' },
  24: { color: '2', cardName: '闪', number: 11, type: '1' },
  25: { color: '2', cardName: '桃', number: 12, type: '1' },
  26: { color: '2', cardName: '杀', number: 13, type: '1' },
  27: { color: '1', cardName: '万箭', number: 1, type: '2' },
  28: { color: '1', cardName: '闪', number: 2, type: '1' },
  29: { color: '1', cardName: '五谷', number: 3, type: '2' },
  30: { color: '1', cardName: '五谷', number: 4, type: '2' },
  31: { color: '1', cardName: '赤兔', number: 5, type: '3' },
  32: { color: '1', cardName: '乐', number: 6, type: '2' },
  33: { color: '1', cardName: '无中', number: 7, type: '2' },
  34: { color: '1', cardName: '无中', number: 8, type: '2' },
  35: { color: '1', cardName: '无中', number: 9, type: '2' },
  36: { color: '1', cardName: '杀', number: 10, type: '1' },
  37: { color: '1', cardName: '无中', number: 11, type: '2' },
  38: { color: '1', cardName: '过拆', number: 12, type: '2' },
  39: { color: '1', cardName: '闪', number: 13, type: '1' },
  40: { color: '1', cardName: '桃园', number: 1, type: '2' },
  41: { color: '1', cardName: '闪', number: 2, type: '1' },
  42: { color: '1', cardName: '桃', number: 3, type: '1' },
  43: { color: '1', cardName: '桃', number: 4, type: '1' },
  44: { color: '1', cardName: '麒麟', number: 5, type: '3' },
  45: { color: '1', cardName: '桃', number: 6, type: '1' },
  46: { color: '1', cardName: '桃', number: 7, type: '1' },
  47: { color: '1', cardName: '桃', number: 8, type: '1' },
  48: { color: '1', cardName: '桃', number: 9, type: '1' },
  49: { color: '1', cardName: '杀', number: 10, type: '1' },
  50: { color: '1', cardName: '杀', number: 11, type: '1' },
  51: { color: '1', cardName: '桃', number: 12, type: '1' },
  52: { color: '1', cardName: '爪黄', number: 13, type: '3' },
  53: { color: '4', cardName: '决斗', number: 1, type: '2' },
  54: { color: '4', cardName: '杀', number: 2, type: '1' },
  55: { color: '4', cardName: '杀', number: 3, type: '1' },
  56: { color: '4', cardName: '杀', number: 4, type: '1' },
  57: { color: '4', cardName: '杀', number: 5, type: '1' },
  58: { color: '4', cardName: '杀', number: 6, type: '1' },
  59: { color: '4', cardName: '杀', number: 7, type: '1' },
  60: { color: '4', cardName: '杀', number: 8, type: '1' },
  61: { color: '4', cardName: '杀', number: 9, type: '1' },
  62: { color: '4', cardName: '杀', number: 10, type: '1' },
  63: { color: '4', cardName: '杀', number: 11, type: '1' },
  64: { color: '4', cardName: '无懈', number: 12, type: '2' },
  65: { color: '4', cardName: '无懈', number: 13, type: '2' },
  66: { color: '4', cardName: '连弩', number: 1, type: '3' },
  67: { color: '4', cardName: '八卦', number: 2, type: '3' },
  68: { color: '4', cardName: '过拆', number: 3, type: '2' },
  69: { color: '4', cardName: '过拆', number: 4, type: '2' },
  70: { color: '4', cardName: '的卢', number: 5, type: '3' },
  71: { color: '4', cardName: '乐', number: 6, type: '2' },
  72: { color: '4', cardName: '南蛮', number: 7, type: '2' },
  73: { color: '4', cardName: '杀', number: 8, type: '1' },
  74: { color: '4', cardName: '杀', number: 9, type: '1' },
  75: { color: '4', cardName: '杀', number: 10, type: '1' },
  76: { color: '4', cardName: '杀', number: 11, type: '1' },
  77: { color: '4', cardName: '借刀', number: 12, type: '2' },
  78: { color: '4', cardName: '借刀', number: 13, type: '2' },
  79: { color: '3', cardName: '决斗', number: 1, type: '2' },
  80: { color: '3', cardName: '雌雄', number: 2, type: '3' },
  81: { color: '3', cardName: '顺手', number: 3, type: '2' },
  82: { color: '3', cardName: '顺手', number: 4, type: '2' },
  83: { color: '3', cardName: '绝影', number: 5, type: '3' },
  84: { color: '3', cardName: '青釭', number: 6, type: '3' },
  85: { color: '3', cardName: '杀', number: 7, type: '1' },
  86: { color: '3', cardName: '杀', number: 8, type: '1' },
  87: { color: '3', cardName: '杀', number: 9, type: '1' },
  88: { color: '3', cardName: '杀', number: 10, type: '1' },
  89: { color: '3', cardName: '顺手', number: 11, type: '2' },
  90: { color: '3', cardName: '过拆', number: 12, type: '2' },
  91: { color: '3', cardName: '南蛮', number: 13, type: '2' },
  92: { color: '3', cardName: '闪电', number: 1, type: '2' },
  93: { color: '3', cardName: '八卦', number: 2, type: '3' },
  94: { color: '3', cardName: '过拆', number: 3, type: '2' },
  95: { color: '3', cardName: '过拆', number: 4, type: '2' },
  96: { color: '3', cardName: '青龙', number: 5, type: '3' },
  97: { color: '3', cardName: '乐', number: 6, type: '2' },
  98: { color: '3', cardName: '南蛮', number: 7, type: '2' },
  99: { color: '3', cardName: '杀', number: 8, type: '1' },
  100: { color: '3', cardName: '杀', number: 9, type: '1' },
  101: { color: '3', cardName: '杀', number: 10, type: '1' },
  102: { color: '3', cardName: '无懈', number: 11, type: '2' },
  103: { color: '3', cardName: '丈八', number: 12, type: '3' },
  104: { color: '3', cardName: '大宛', number: 13, type: '3' },
  105: { color: '1', cardName: '闪电', number: 12, type: '2' },
  106: { color: '2', cardName: '无懈', number: 12, type: '2' },
  107: { color: '4', cardName: '仁王', number: 2, type: '3' },
  108: { color: '3', cardName: '寒冰', number: 2, type: '3' },
  109: { color: '1', cardName: '无懈', number: 1, type: '2' },
  110: { color: '1', cardName: '火攻', number: 2, type: '2' },
  111: { color: '1', cardName: '火攻', number: 3, type: '2' },
  112: { color: '1', cardName: '火杀', number: 4, type: '1' },
  113: { color: '1', cardName: '桃', number: 5, type: '1' },
  114: { color: '1', cardName: '桃', number: 6, type: '1' },
  115: { color: '1', cardName: '火杀', number: 7, type: '1' },
  116: { color: '1', cardName: '闪', number: 8, type: '1' },
  117: { color: '1', cardName: '闪', number: 9, type: '1' },
  118: { color: '1', cardName: '火杀', number: 10, type: '1' },
  119: { color: '1', cardName: '闪', number: 11, type: '1' },
  120: { color: '1', cardName: '闪', number: 12, type: '1' },
  121: { color: '1', cardName: '无懈', number: 13, type: '2' },
  122: { color: '2', cardName: '朱雀', number: 1, type: '3' },
  123: { color: '2', cardName: '桃', number: 2, type: '1' },
  124: { color: '2', cardName: '桃', number: 3, type: '1' },
  125: { color: '2', cardName: '火杀', number: 4, type: '1' },
  126: { color: '2', cardName: '火杀', number: 5, type: '1' },
  127: { color: '2', cardName: '闪', number: 6, type: '1' },
  128: { color: '2', cardName: '闪', number: 7, type: '1' },
  129: { color: '2', cardName: '闪', number: 8, type: '1' },
  130: { color: '2', cardName: '酒', number: 9, type: '1' },
  131: { color: '2', cardName: '闪', number: 10, type: '1' },
  132: { color: '2', cardName: '闪', number: 11, type: '1' },
  133: { color: '2', cardName: '火攻', number: 12, type: '2' },
  134: { color: '2', cardName: '骅骝', number: 13, type: '3' },
  135: { color: '3', cardName: '古锭', number: 1, type: '3' },
  136: { color: '3', cardName: '藤甲', number: 2, type: '3' },
  137: { color: '3', cardName: '酒', number: 3, type: '1' },
  138: { color: '3', cardName: '雷杀', number: 4, type: '1' },
  139: { color: '3', cardName: '雷杀', number: 5, type: '1' },
  140: { color: '3', cardName: '雷杀', number: 6, type: '1' },
  141: { color: '3', cardName: '雷杀', number: 7, type: '1' },
  142: { color: '3', cardName: '雷杀', number: 8, type: '1' },
  143: { color: '3', cardName: '酒', number: 9, type: '1' },
  144: { color: '3', cardName: '兵', number: 10, type: '2' },
  145: { color: '3', cardName: '铁索', number: 11, type: '2' },
  146: { color: '3', cardName: '铁索', number: 12, type: '2' },
  147: { color: '3', cardName: '无懈', number: 13, type: '2' },
  148: { color: '4', cardName: '白银', number: 1, type: '3' },
  149: { color: '4', cardName: '藤甲', number: 2, type: '3' },
  150: { color: '4', cardName: '酒', number: 3, type: '1' },
  151: { color: '4', cardName: '兵', number: 4, type: '2' },
  152: { color: '4', cardName: '雷杀', number: 5, type: '1' },
  153: { color: '4', cardName: '雷杀', number: 6, type: '1' },
  154: { color: '4', cardName: '雷杀', number: 7, type: '1' },
  155: { color: '4', cardName: '雷杀', number: 8, type: '1' },
  156: { color: '4', cardName: '酒', number: 9, type: '1' },
  157: { color: '4', cardName: '铁索', number: 10, type: '2' },
  158: { color: '4', cardName: '铁索', number: 11, type: '2' },
  159: { color: '4', cardName: '铁索', number: 12, type: '2' },
  160: { color: '4', cardName: '铁索', number: 13, type: '2' },
  161: { color: '2', cardName: '木马', number: 5, type: '3' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' }
}

let HuanLeBiaoZhunShanShan = {
  0: { color: '', cardName: '?', number: '', type: '' },
  1: { color: '2', cardName: '决斗', number: 1, type: '2' },
  2: { color: '2', cardName: '闪', number: 2, type: '1' },
  3: { color: '2', cardName: '顺手', number: 3, type: '2' },
  4: { color: '2', cardName: '顺手', number: 4, type: '2' },
  5: { color: '2', cardName: '贯石', number: 5, type: '3' },
  6: { color: '2', cardName: '杀', number: 6, type: '1' },
  7: { color: '2', cardName: '杀', number: 7, type: '1' },
  8: { color: '2', cardName: '杀', number: 8, type: '1' },
  9: { color: '2', cardName: '杀', number: 9, type: '1' },
  10: { color: '2', cardName: '杀', number: 10, type: '1' },
  11: { color: '2', cardName: '闪', number: 11, type: '1' },
  12: { color: '2', cardName: '方天', number: 12, type: '3' },
  13: { color: '2', cardName: '紫骍', number: 13, type: '3' },
  14: { color: '2', cardName: '连弩', number: 1, type: '3' },
  15: { color: '2', cardName: '闪', number: 2, type: '1' },
  12140: { color: '2', cardName: '闪', number: 3, type: '1' },
  17: { color: '2', cardName: '闪', number: 4, type: '1' },
  12141: { color: '2', cardName: '闪', number: 5, type: '1' },
  12142: { color: '2', cardName: '闪', number: 6, type: '1' },
  20: { color: '2', cardName: '闪', number: 7, type: '1' },
  21: { color: '2', cardName: '闪', number: 8, type: '1' },
  22: { color: '2', cardName: '闪', number: 9, type: '1' },
  23: { color: '2', cardName: '闪', number: 10, type: '1' },
  24: { color: '2', cardName: '闪', number: 11, type: '1' },
  25: { color: '2', cardName: '桃', number: 12, type: '1' },
  26: { color: '2', cardName: '杀', number: 13, type: '1' },
  27: { color: '1', cardName: '万箭', number: 1, type: '2' },
  28: { color: '1', cardName: '闪', number: 2, type: '1' },
  29: { color: '1', cardName: '五谷', number: 3, type: '2' },
  30: { color: '1', cardName: '五谷', number: 4, type: '2' },
  31: { color: '1', cardName: '赤兔', number: 5, type: '3' },
  32: { color: '1', cardName: '乐', number: 6, type: '2' },
  33: { color: '1', cardName: '无中', number: 7, type: '2' },
  34: { color: '1', cardName: '无中', number: 8, type: '2' },
  35: { color: '1', cardName: '无中', number: 9, type: '2' },
  36: { color: '1', cardName: '杀', number: 10, type: '1' },
  37: { color: '1', cardName: '无中', number: 11, type: '2' },
  38: { color: '1', cardName: '过拆', number: 12, type: '2' },
  39: { color: '1', cardName: '闪', number: 13, type: '1' },
  40: { color: '1', cardName: '桃园', number: 1, type: '2' },
  41: { color: '1', cardName: '闪', number: 2, type: '1' },
  42: { color: '1', cardName: '桃', number: 3, type: '1' },
  43: { color: '1', cardName: '桃', number: 4, type: '1' },
  44: { color: '1', cardName: '麒麟', number: 5, type: '3' },
  45: { color: '1', cardName: '桃', number: 6, type: '1' },
  46: { color: '1', cardName: '桃', number: 7, type: '1' },
  47: { color: '1', cardName: '桃', number: 8, type: '1' },
  48: { color: '1', cardName: '桃', number: 9, type: '1' },
  49: { color: '1', cardName: '杀', number: 10, type: '1' },
  50: { color: '1', cardName: '杀', number: 11, type: '1' },
  51: { color: '1', cardName: '桃', number: 12, type: '1' },
  52: { color: '1', cardName: '爪黄', number: 13, type: '3' },
  53: { color: '4', cardName: '决斗', number: 1, type: '2' },
  54: { color: '4', cardName: '杀', number: 2, type: '1' },
  55: { color: '4', cardName: '杀', number: 3, type: '1' },
  56: { color: '4', cardName: '杀', number: 4, type: '1' },
  57: { color: '4', cardName: '杀', number: 5, type: '1' },
  58: { color: '4', cardName: '杀', number: 6, type: '1' },
  59: { color: '4', cardName: '杀', number: 7, type: '1' },
  60: { color: '4', cardName: '杀', number: 8, type: '1' },
  61: { color: '4', cardName: '杀', number: 9, type: '1' },
  62: { color: '4', cardName: '杀', number: 10, type: '1' },
  63: { color: '4', cardName: '杀', number: 11, type: '1' },
  64: { color: '4', cardName: '无懈', number: 12, type: '2' },
  65: { color: '4', cardName: '无懈', number: 13, type: '2' },
  66: { color: '4', cardName: '连弩', number: 1, type: '3' },
  67: { color: '4', cardName: '八卦', number: 2, type: '3' },
  68: { color: '4', cardName: '过拆', number: 3, type: '2' },
  69: { color: '4', cardName: '过拆', number: 4, type: '2' },
  70: { color: '4', cardName: '的卢', number: 5, type: '3' },
  71: { color: '4', cardName: '乐', number: 6, type: '2' },
  72: { color: '4', cardName: '南蛮', number: 7, type: '2' },
  73: { color: '4', cardName: '杀', number: 8, type: '1' },
  74: { color: '4', cardName: '杀', number: 9, type: '1' },
  75: { color: '4', cardName: '杀', number: 10, type: '1' },
  76: { color: '4', cardName: '杀', number: 11, type: '1' },
  77: { color: '4', cardName: '借刀', number: 12, type: '2' },
  78: { color: '4', cardName: '借刀', number: 13, type: '2' },
  79: { color: '3', cardName: '决斗', number: 1, type: '2' },
  80: { color: '3', cardName: '雌雄', number: 2, type: '3' },
  81: { color: '3', cardName: '顺手', number: 3, type: '2' },
  82: { color: '3', cardName: '顺手', number: 4, type: '2' },
  83: { color: '3', cardName: '绝影', number: 5, type: '3' },
  84: { color: '3', cardName: '青釭', number: 6, type: '3' },
  85: { color: '3', cardName: '杀', number: 7, type: '1' },
  86: { color: '3', cardName: '杀', number: 8, type: '1' },
  87: { color: '3', cardName: '杀', number: 9, type: '1' },
  88: { color: '3', cardName: '杀', number: 10, type: '1' },
  89: { color: '3', cardName: '顺手', number: 11, type: '2' },
  90: { color: '3', cardName: '过拆', number: 12, type: '2' },
  91: { color: '3', cardName: '南蛮', number: 13, type: '2' },
  92: { color: '3', cardName: '闪电', number: 1, type: '2' },
  93: { color: '3', cardName: '八卦', number: 2, type: '3' },
  94: { color: '3', cardName: '过拆', number: 3, type: '2' },
  95: { color: '3', cardName: '过拆', number: 4, type: '2' },
  96: { color: '3', cardName: '青龙', number: 5, type: '3' },
  97: { color: '3', cardName: '乐', number: 6, type: '2' },
  98: { color: '3', cardName: '南蛮', number: 7, type: '2' },
  99: { color: '3', cardName: '杀', number: 8, type: '1' },
  100: { color: '3', cardName: '杀', number: 9, type: '1' },
  101: { color: '3', cardName: '杀', number: 10, type: '1' },
  102: { color: '3', cardName: '无懈', number: 11, type: '2' },
  103: { color: '3', cardName: '丈八', number: 12, type: '3' },
  104: { color: '3', cardName: '大宛', number: 13, type: '3' },
  105: { color: '1', cardName: '闪电', number: 12, type: '2' },
  106: { color: '2', cardName: '无懈', number: 12, type: '2' },
  107: { color: '4', cardName: '仁王', number: 2, type: '3' },
  108: { color: '3', cardName: '寒冰', number: 2, type: '3' },
  109: { color: '1', cardName: '无懈', number: 1, type: '2' },
  110: { color: '1', cardName: '火攻', number: 2, type: '2' },
  111: { color: '1', cardName: '火攻', number: 3, type: '2' },
  112: { color: '1', cardName: '火杀', number: 4, type: '1' },
  113: { color: '1', cardName: '桃', number: 5, type: '1' },
  114: { color: '1', cardName: '桃', number: 6, type: '1' },
  115: { color: '1', cardName: '火杀', number: 7, type: '1' },
  116: { color: '1', cardName: '闪', number: 8, type: '1' },
  117: { color: '1', cardName: '闪', number: 9, type: '1' },
  118: { color: '1', cardName: '火杀', number: 10, type: '1' },
  119: { color: '1', cardName: '闪', number: 11, type: '1' },
  120: { color: '1', cardName: '闪', number: 12, type: '1' },
  121: { color: '1', cardName: '无懈', number: 13, type: '2' },
  122: { color: '2', cardName: '朱雀', number: 1, type: '3' },
  123: { color: '2', cardName: '桃', number: 2, type: '1' },
  124: { color: '2', cardName: '桃', number: 3, type: '1' },
  125: { color: '2', cardName: '火杀', number: 4, type: '1' },
  126: { color: '2', cardName: '火杀', number: 5, type: '1' },
  127: { color: '2', cardName: '闪', number: 6, type: '1' },
  128: { color: '2', cardName: '闪', number: 7, type: '1' },
  129: { color: '2', cardName: '闪', number: 8, type: '1' },
  130: { color: '2', cardName: '酒', number: 9, type: '1' },
  131: { color: '2', cardName: '闪', number: 10, type: '1' },
  132: { color: '2', cardName: '闪', number: 11, type: '1' },
  133: { color: '2', cardName: '火攻', number: 12, type: '2' },
  134: { color: '2', cardName: '骅骝', number: 13, type: '3' },
  135: { color: '3', cardName: '古锭', number: 1, type: '3' },
  136: { color: '3', cardName: '藤甲', number: 2, type: '3' },
  137: { color: '3', cardName: '酒', number: 3, type: '1' },
  138: { color: '3', cardName: '雷杀', number: 4, type: '1' },
  139: { color: '3', cardName: '雷杀', number: 5, type: '1' },
  140: { color: '3', cardName: '雷杀', number: 6, type: '1' },
  141: { color: '3', cardName: '雷杀', number: 7, type: '1' },
  142: { color: '3', cardName: '雷杀', number: 8, type: '1' },
  143: { color: '3', cardName: '酒', number: 9, type: '1' },
  144: { color: '3', cardName: '兵', number: 10, type: '2' },
  145: { color: '3', cardName: '铁索', number: 11, type: '2' },
  146: { color: '3', cardName: '铁索', number: 12, type: '2' },
  147: { color: '3', cardName: '无懈', number: 13, type: '2' },
  148: { color: '4', cardName: '白银', number: 1, type: '3' },
  149: { color: '4', cardName: '藤甲', number: 2, type: '3' },
  150: { color: '4', cardName: '酒', number: 3, type: '1' },
  151: { color: '4', cardName: '兵', number: 4, type: '2' },
  152: { color: '4', cardName: '雷杀', number: 5, type: '1' },
  153: { color: '4', cardName: '雷杀', number: 6, type: '1' },
  154: { color: '4', cardName: '雷杀', number: 7, type: '1' },
  155: { color: '4', cardName: '雷杀', number: 8, type: '1' },
  156: { color: '4', cardName: '酒', number: 9, type: '1' },
  157: { color: '4', cardName: '铁索', number: 10, type: '2' },
  158: { color: '4', cardName: '铁索', number: 11, type: '2' },
  159: { color: '4', cardName: '铁索', number: 12, type: '2' },
  160: { color: '4', cardName: '铁索', number: 13, type: '2' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' }
}

let JunZhengYingBianShanShan = {
  0: { id: 0, cardName: '?', type: '', subType: 9, exType: 27, number: '', color: '', attRange: 0, attDistance: 0, defDistance: 0, spellId: 700, res: 'MuNiuLiuMa' },
  161: { id: 161, cardName: '木马', type: 3, subType: 9, exType: 27, number: 5, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 700, res: 'MuNiuLiuMa' },
  7001: { id: 7001, cardName: '决斗', type: 2, subType: 0, exType: 47, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, imageId: 8, res: 'JueDou', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_19,8_9,3_13,8_23,8_54,6' },
  7002: { id: 7002, cardName: '顺手', type: 2, subType: 0, exType: 47, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 4, imageId: 4, res: 'ShunShouQianYang', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8' },
  7003: { id: 7003, cardName: '顺手', type: 2, subType: 0, exType: 47, number: 4, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 4, imageId: 4, res: 'ShunShouQianYang', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8' },
  7004: { id: 7004, cardName: '贯石', type: 3, subType: 1, exType: 47, number: 5, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 28, imageId: 28, res: 'GuanShiFu', Grade1: '10,13', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_26,5_34,8' },
  7005: { id: 7005, cardName: '杀', type: 1, subType: 0, exType: 47, number: 6, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7006: { id: 7006, cardName: '杀', type: 1, subType: 0, exType: 47, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7007: { id: 7007, cardName: '杀', type: 1, subType: 0, exType: 47, number: 9, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7008: { id: 7008, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6_38,4_46,4_152,4' },
  7009: { id: 7009, cardName: '紫騂', type: 3, subType: 4, exType: 47, number: 13, color: 2, attRange: 0, attDistance: 1, defDistance: 0, spellId: 18, imageId: 18, res: 'ZiXing', Grade1: '10,12', Grade2: '4,6', Grade3: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_27,8_38,6_46,6_152,6' },
  7010: { id: 7010, cardName: '连弩', type: 3, subType: 1, exType: 47, number: 1, color: 2, attRange: 1, attDistance: 0, defDistance: 0, spellId: 23, imageId: 23, res: 'ZhuGeLianNu', Grade1: '10,12', Grade2: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_11,12_10,12_34,8' },
  7011: { id: 7011, cardName: '闪', type: 1, subType: 0, exType: 47, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7012: { id: 7012, cardName: '闪', type: 1, subType: 0, exType: 47, number: 5, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7013: { id: 7013, cardName: '闪', type: 1, subType: 0, exType: 47, number: 6, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7014: { id: 7014, cardName: '闪', type: 1, subType: 0, exType: 47, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7015: { id: 7015, cardName: '闪', type: 1, subType: 0, exType: 47, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7016: { id: 7016, cardName: '闪', type: 1, subType: 0, exType: 47, number: 9, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7017: { id: 7017, cardName: '闪', type: 1, subType: 0, exType: 47, number: 10, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7018: { id: 7018, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6_38,4_46,4_152,4' },
  7019: { id: 7019, cardName: '桃', type: 1, subType: 0, exType: 47, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,8_11,7_13,8_20,8_35,8_38,5_46,5_152,5' },
  7020: { id: 7020, cardName: '杀', type: 1, subType: 0, exType: 47, number: 13, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_38,6_46,6_152,6_54,6' },
  7021: { id: 7021, cardName: '五谷', type: 2, subType: 0, exType: 47, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6, imageId: 6, res: 'WuGuFengDeng', Grade1: '10,14', Grade2: '10,14', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7022: { id: 7022, cardName: '赤兔', type: 3, subType: 4, exType: 47, number: 5, color: 1, attRange: 0, attDistance: 1, defDistance: 0, spellId: 17, imageId: 17, res: 'ChiTu', Grade1: '10,12', Grade2: '4,6', Grade3: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_27,8_30,5_154,7' },
  7023: { id: 7023, cardName: '乐', type: 2, subType: 5, exType: 47, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, imageId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '16,20', Grade2: '14,16', Grade3: '9,11', Specials: '2,4_106,4_22,6_30,5_154,7' },
  7024: { id: 7024, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7025: { id: 7025, cardName: '过拆', type: 2, subType: 0, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, imageId: 5, res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_38,5_46,5_152,5_154,7' },
  7026: { id: 7026, cardName: '闪', type: 1, subType: 0, exType: 47, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_38,6_46,6_152,6_154,7' },
  7027: { id: 7027, cardName: '桃', type: 1, subType: 0, exType: 47, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7028: { id: 7028, cardName: '桃', type: 1, subType: 0, exType: 47, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7029: { id: 7029, cardName: '麒麟', type: 3, subType: 1, exType: 47, number: 5, color: 1, attRange: 5, attDistance: 0, defDistance: 0, spellId: 30, imageId: 30, res: 'QiLinGong', Grade1: '10,14', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_26,6_30,5_34,8_154,7' },
  7030: { id: 7030, cardName: '桃', type: 1, subType: 0, exType: 47, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7031: { id: 7031, cardName: '桃', type: 1, subType: 0, exType: 47, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7032: { id: 7032, cardName: '桃', type: 1, subType: 0, exType: 47, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7033: { id: 7033, cardName: '桃', type: 1, subType: 0, exType: 47, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7034: { id: 7034, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7035: { id: 7035, cardName: '杀', type: 1, subType: 0, exType: 47, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_38,4_46,4_152,4_154,7_54,6' },
  7036: { id: 7036, cardName: '桃', type: 1, subType: 0, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_38,5_46,5_152,5_154,7' },
  7037: { id: 7037, cardName: '爪黄', type: 3, subType: 3, exType: 47, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 1, spellId: 22, imageId: 22, res: 'ZhuaHuangFeiDian', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_30,5_38,6_46,6_152,6_154,7' },
  7038: { id: 7038, cardName: '杀', type: 1, subType: 0, exType: 47, number: 6, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7039: { id: 7039, cardName: '杀', type: 1, subType: 0, exType: 47, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7040: { id: 7040, cardName: '杀', type: 1, subType: 0, exType: 47, number: 8, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7041: { id: 7041, cardName: '杀', type: 1, subType: 0, exType: 47, number: 11, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_38,4_46,4_152,4_42,6' },
  7042: { id: 7042, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_36,6_38,5_46,5_152,5' },
  7043: { id: 7043, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 13, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_36,6_38,6_46,6_152,6' },
  7044: { id: 7044, cardName: '连弩', type: 3, subType: 1, exType: 47, number: 1, color: 4, attRange: 1, attDistance: 0, defDistance: 0, spellId: 23, imageId: 23, res: 'ZhuGeLianNu', Grade1: '10,12', Grade2: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_11,12_10,12_34,8_36,6_42,7' },
  7045: { id: 7045, cardName: '的卢', type: 3, subType: 3, exType: 47, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 1, spellId: 21, imageId: 21, res: 'DiLu', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7046: { id: 7046, cardName: '乐', type: 2, subType: 5, exType: 47, number: 6, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, imageId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '16,20', Grade2: '14,16', Grade3: '9,11', Specials: '21,5_9,7_36,6' },
  7047: { id: 7047, cardName: '杀', type: 1, subType: 0, exType: 47, number: 8, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7048: { id: 7048, cardName: '雌雄', type: 3, subType: 1, exType: 47, number: 2, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 24, imageId: 24, res: 'CiXiongShuangGuJian', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7049: { id: 7049, cardName: '绝影', type: 3, subType: 3, exType: 47, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 1, spellId: 20, imageId: 20, res: 'JueYing', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7050: { id: 7050, cardName: '青釭', type: 3, subType: 1, exType: 47, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 25, imageId: 25, res: 'QingGangJian', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7051: { id: 7051, cardName: '八卦', type: 3, subType: 2, exType: 47, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 16, imageId: 16, res: 'BaGuaZhen', Grade1: '12,17', Grade2: '5,8', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7052: { id: 7052, cardName: '过拆', type: 2, subType: 0, exType: 47, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, imageId: 5, res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7' },
  7053: { id: 7053, cardName: '青龙', type: 3, subType: 1, exType: 47, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 26, imageId: 26, res: 'QingLongYanYueDao', Grade1: '10,13', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,5_30,5_32,5_45,7_34,8_42,7' },
  7054: { id: 7054, cardName: '乐', type: 2, subType: 5, exType: 47, number: 6, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, imageId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '16,20', Grade2: '14,16', Grade3: '9,11', Specials: '21,5_9,7_30,5_32,5_45,7' },
  7055: { id: 7055, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7056: { id: 7056, cardName: '丈八', type: 3, subType: 1, exType: 47, number: 12, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 27, imageId: 27, res: 'ZhangBaSheMao', Grade1: '10,13', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,5_30,5_32,5_45,7_34,8_38,5_46,5_152,5_42,7' },
  7057: { id: 7057, cardName: '大宛', type: 3, subType: 4, exType: 47, number: 13, color: 3, attRange: 0, attDistance: 1, defDistance: 0, spellId: 19, imageId: 19, res: 'DaWan', Grade1: '10,12', Grade2: '4,6', Grade3: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_27,8_30,5_32,5_45,7_38,6_46,6_152,6_42,7' },
  7058: { id: 7058, cardName: '闪电', type: 2, subType: 5, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 11, imageId: 11, cardClass: 'DelayedJinNangCard', res: 'ShanDian', Grade1: '5,7', Grade2: '2,5', Specials: '2,4_106,4_22,6_30,5_38,5_46,5_152,5_154,7' },
  7059: { id: 7059, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8_38,5_46,5_152,5' },
  7060: { id: 7060, cardName: '仁王', type: 3, subType: 2, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 200, imageId: 200, res: 'RenWangDun', Grade1: '13,18', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7061: { id: 7061, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7062: { id: 7062, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6,5,7_105,5_39,5_26,5_6,2_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7063: { id: 7063, cardName: '桃', type: 1, subType: 0, exType: 47, number: 5, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7064: { id: 7064, cardName: '桃', type: 1, subType: 0, exType: 47, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7065: { id: 7065, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6,5,7_105,5_39,5_26,5_6,2_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7066: { id: 7066, cardName: '闪', type: 1, subType: 0, exType: 47, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7067: { id: 7067, cardName: '闪', type: 1, subType: 0, exType: 47, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7068: { id: 7068, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_38,4_46,4_152,4_154,7' },
  7069: { id: 7069, cardName: '闪', type: 1, subType: 0, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_38,5_46,5_152,5_154,7' },
  7070: { id: 7070, cardName: '桃', type: 1, subType: 0, exType: 47, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,8_11,7_13,8_20,8_35,8' },
  7071: { id: 7071, cardName: '桃', type: 1, subType: 0, exType: 47, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,8_11,7_13,8_20,8_35,8' },
  7072: { id: 7072, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 5, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6,5,7_105,5_39,5_26,5_6,2_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7073: { id: 7073, cardName: '闪', type: 1, subType: 0, exType: 47, number: 6, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7074: { id: 7074, cardName: '闪', type: 1, subType: 0, exType: 47, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7075: { id: 7075, cardName: '闪', type: 1, subType: 0, exType: 47, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7076: { id: 7076, cardName: '酒', type: 1, subType: 0, exType: 47, number: 9, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2,4_106,4_22,6_20,6_13,8_11,5' },
  7077: { id: 7077, cardName: '闪', type: 1, subType: 0, exType: 47, number: 10, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7078: { id: 7078, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6_38,4_46,4_152,4' },
  7079: { id: 7079, cardName: '骅骝', type: 3, subType: 3, exType: 47, number: 13, color: 2, attRange: 0, attDistance: 0, defDistance: 1, spellId: 90, res: 'HuaLiu', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_38,6_46,6_152,6' },
  7080: { id: 7080, cardName: '古锭', type: 3, subType: 1, exType: 47, number: 1, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 86, res: 'GuDingDao', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7081: { id: 7081, cardName: '藤甲', type: 3, subType: 2, exType: 47, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 88, res: 'TengJia', Grade1: '7,9', Grade2: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7082: { id: 7082, cardName: '酒', type: 1, subType: 0, exType: 47, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_30,5_32,5_42,6' },
  7083: { id: 7083, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7084: { id: 7084, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7085: { id: 7085, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 6, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7086: { id: 7086, cardName: '酒', type: 1, subType: 0, exType: 47, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_30,5_32,5_42,6' },
  7087: { id: 7087, cardName: '兵', type: 2, subType: 5, exType: 47, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 84, cardClass: 'DelayedJinNangCard', res: 'BingLiangCunDuan', Grade1: '16,20', Grade2: '14,16', Grade3: '12,14', Grade4: '10,12', Specials: '21,5_9,7_30,5_32,5_45,7_42,5' },
  7088: { id: 7088, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7089: { id: 7089, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 12, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,5_46,5_152,5' },
  7090: { id: 7090, cardName: '藤甲', type: 3, subType: 2, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 88, res: 'TengJia', Grade1: '7,9', Grade2: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7091: { id: 7091, cardName: '酒', type: 1, subType: 0, exType: 47, number: 3, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_36,6_42,6' },
  7092: { id: 7092, cardName: '兵', type: 2, subType: 5, exType: 47, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 84, cardClass: 'DelayedJinNangCard', res: 'BingLiangCunDuan', Grade1: '16,20', Grade2: '14,16', Grade3: '12,14', Grade4: '10,12', Specials: '21,5_9,7_36,6_42,5' },
  7093: { id: 7093, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7094: { id: 7094, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 6, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7095: { id: 7095, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7096: { id: 7096, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 8, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7097: { id: 7097, cardName: '酒', type: 1, subType: 0, exType: 47, number: 9, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_36,6_42,6' },
  7098: { id: 7098, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 10, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7' },
  7099: { id: 7099, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 11, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_38,4_46,4_152,4' },
  7100: { id: 7100, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_38,5_46,5_152,5' },
  7101: { id: 7101, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 13, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_38,6_46,6_152,6' },
  7102: { id: 7102, cardName: '决斗', type: 2, subType: 0, exType: 47, number: 1, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, imageId: 8, cardClass: 'JinNangCard', res: 'JueDou', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_30,5_32,5_45,7_54,6' },
  7103: { id: 7103, cardName: '太公', type: 3, subType: 9, exType: 47, number: 1, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7104: { id: 7104, cardName: '随机', type: 2, subType: 0, exType: 47, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6006, imageId: 6006, cardClass: 'SuiJiYingBianNCard', res: 'SuiJiYingBian', Grade1: '23,25', Grade2: '12,15' },
  7105: { id: 7105, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7106: { id: 7106, cardName: '水淹', type: 2, subType: 0, exType: 47, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6004, imageId: 6004, cardClass: 'JinNangCard', res: 'ShuiYanQiJun2', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_30,5_32,5_45,7_54,6' },
  7107: { id: 7107, cardName: '水淹', type: 2, subType: 0, exType: 47, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6004, imageId: 6004, cardClass: 'JinNangCard', res: 'ShuiYanQiJun2', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_30,5_32,5_45,7_54,6' },
  7108: { id: 7108, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7109: { id: 7109, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7110: { id: 7110, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7111: { id: 7111, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7112: { id: 7112, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7113: { id: 7113, cardName: '杀', type: 1, subType: 0, exType: 47, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7114: { id: 7114, cardName: '杀', type: 1, subType: 0, exType: 47, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7115: { id: 7115, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7116: { id: 7116, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7117: { id: 7117, cardName: '顺手', type: 2, subType: 0, exType: 47, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 4, imageId: 4, res: 'ShunShouQianYang', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7118: { id: 7118, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 12, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3024, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7119: { id: 7119, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 13, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3025, spellId: 13, imageId: 13, cardClass: 'JinNangCard', res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7120: { id: 7120, cardName: '天机', type: 3, subType: 9, exType: 47, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7121: { id: 7121, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7122: { id: 7122, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7123: { id: 7123, cardName: '过拆', type: 2, subType: 0, exType: 47, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, imageId: 5, cardClass: 'JinNangCard', res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_36,6' },
  7124: { id: 7124, cardName: '出其', type: 2, subType: 0, exType: 47, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6000, imageId: 6000, cardClass: 'JinNangCard', res: 'ChuQiBuYi', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_19,8_9,3_13,8_23,8_54,6' },
  7125: { id: 7125, cardName: '五谷', type: 2, subType: 0, exType: 47, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6, imageId: 6, res: 'WuGuFengDeng', Grade1: '10,14', Grade2: '10,14', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7126: { id: 7126, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7127: { id: 7127, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7128: { id: 7128, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7129: { id: 7129, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3023, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7130: { id: 7130, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7131: { id: 7131, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3021, spellId: 13, imageId: 13, cardClass: 'JinNangCard', res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_38,6_46,6_152,6_154,7' },
  7132: { id: 7132, cardName: '决斗', type: 2, subType: 0, exType: 47, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, imageId: 8, cardClass: 'JinNangCard', res: 'JueDou', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_36,6_54,6' },
  7133: { id: 7133, cardName: '护心', type: 3, subType: 2, exType: 47, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7134: { id: 7134, cardName: '杀', type: 1, subType: 0, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7135: { id: 7135, cardName: '黑光', type: 3, subType: 2, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7136: { id: 7136, cardName: '杀', type: 1, subType: 0, exType: 47, number: 3, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7137: { id: 7137, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 3, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_36,6' },
  7138: { id: 7138, cardName: '杀', type: 1, subType: 0, exType: 47, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7139: { id: 7139, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_36,6' },
  7140: { id: 7140, cardName: '杀', type: 1, subType: 0, exType: 47, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7141: { id: 7141, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 9, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7142: { id: 7142, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 9, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7143: { id: 7143, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 10, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7144: { id: 7144, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 10, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7145: { id: 7145, cardName: '杀', type: 1, subType: 0, exType: 47, number: 11, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7146: { id: 7146, cardName: '铜雀', type: 3, subType: 9, exType: 47, number: 13, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6013, imageId: 6013, cardClass: 'EquipCard', res: 'TongQue', Grade1: '13,16', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7147: { id: 7147, cardName: '五行', type: 3, subType: 1, exType: 47, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_26,6_34,8' },
  7148: { id: 7148, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7149: { id: 7149, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7150: { id: 7150, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 4, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3023, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7151: { id: 7151, cardName: '杀', type: 1, subType: 0, exType: 47, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3024, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7152: { id: 7152, cardName: '杀', type: 1, subType: 6, exType: 47, number: 10, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7153: { id: 7153, cardName: '出其', type: 2, subType: 0, exType: 47, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6000, imageId: 6000, cardClass: 'JinNangCard', res: 'ChuQiBuYi', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_19,8_9,3_13,8_23,8_54,6' },
  7154: { id: 7154, cardName: '乌铁', type: 3, subType: 1, exType: 47, number: 12, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', CanLianHeng: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_26,5_34,8' },
  7155: { id: 7155, cardName: '南蛮', type: 2, subType: 0, exType: 47, number: 13, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  7156: { id: 7156, cardName: '南蛮', type: 2, subType: 0, exType: 47, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  7157: { id: 7157, cardName: '桃园', type: 2, subType: 0, exType: 47, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 12, imageId: 12, res: 'TaoYuanJieYi', Grade1: '8,12', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7158: { id: 7158, cardName: '万箭', type: 2, subType: 0, exType: 47, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 10, imageId: 10, res: 'WanJianQiFa', Grade1: '14,17', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7159: { id: 7159, cardName: '南蛮', type: 2, subType: 0, exType: 47, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  7160: { id: 7160, cardName: '闪', type: 1, subType: 0, exType: 47, number: 4, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3021, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' },
  12142: { color: '2', cardName: '闪', number: 6, type: '1' },
  12141: { color: '2', cardName: '闪', number: 5, type: '1' },
  12140: { color: '2', cardName: '闪', number: 3, type: '1' }
}

let HuanLeBiaoZhun = {
  0: { color: '', cardName: '?', number: '', type: '' },
  1: { color: '2', cardName: '决斗', number: 1, type: '2' },
  2: { color: '2', cardName: '闪', number: 2, type: '1' },
  3: { color: '2', cardName: '顺手', number: 3, type: '2' },
  4: { color: '2', cardName: '顺手', number: 4, type: '2' },
  5: { color: '2', cardName: '贯石', number: 5, type: '3' },
  6: { color: '2', cardName: '杀', number: 6, type: '1' },
  7: { color: '2', cardName: '杀', number: 7, type: '1' },
  8: { color: '2', cardName: '杀', number: 8, type: '1' },
  9: { color: '2', cardName: '杀', number: 9, type: '1' },
  10: { color: '2', cardName: '杀', number: 10, type: '1' },
  11: { color: '2', cardName: '闪', number: 11, type: '1' },
  12: { color: '2', cardName: '方天', number: 12, type: '3' },
  13: { color: '2', cardName: '紫骍', number: 13, type: '3' },
  14: { color: '2', cardName: '连弩', number: 1, type: '3' },
  15: { color: '2', cardName: '闪', number: 2, type: '1' },
  16: { color: '2', cardName: '闪', number: 3, type: '1' },
  17: { color: '2', cardName: '闪', number: 4, type: '1' },
  18: { color: '2', cardName: '闪', number: 5, type: '1' },
  19: { color: '2', cardName: '闪', number: 6, type: '1' },
  20: { color: '2', cardName: '闪', number: 7, type: '1' },
  21: { color: '2', cardName: '闪', number: 8, type: '1' },
  22: { color: '2', cardName: '闪', number: 9, type: '1' },
  23: { color: '2', cardName: '闪', number: 10, type: '1' },
  24: { color: '2', cardName: '闪', number: 11, type: '1' },
  25: { color: '2', cardName: '桃', number: 12, type: '1' },
  26: { color: '2', cardName: '杀', number: 13, type: '1' },
  27: { color: '1', cardName: '万箭', number: 1, type: '2' },
  28: { color: '1', cardName: '闪', number: 2, type: '1' },
  29: { color: '1', cardName: '五谷', number: 3, type: '2' },
  30: { color: '1', cardName: '五谷', number: 4, type: '2' },
  31: { color: '1', cardName: '赤兔', number: 5, type: '3' },
  32: { color: '1', cardName: '乐', number: 6, type: '2' },
  33: { color: '1', cardName: '无中', number: 7, type: '2' },
  34: { color: '1', cardName: '无中', number: 8, type: '2' },
  35: { color: '1', cardName: '无中', number: 9, type: '2' },
  36: { color: '1', cardName: '杀', number: 10, type: '1' },
  37: { color: '1', cardName: '无中', number: 11, type: '2' },
  38: { color: '1', cardName: '过拆', number: 12, type: '2' },
  39: { color: '1', cardName: '闪', number: 13, type: '1' },
  40: { color: '1', cardName: '桃园', number: 1, type: '2' },
  41: { color: '1', cardName: '闪', number: 2, type: '1' },
  42: { color: '1', cardName: '桃', number: 3, type: '1' },
  43: { color: '1', cardName: '桃', number: 4, type: '1' },
  44: { color: '1', cardName: '麒麟', number: 5, type: '3' },
  45: { color: '1', cardName: '桃', number: 6, type: '1' },
  46: { color: '1', cardName: '桃', number: 7, type: '1' },
  47: { color: '1', cardName: '桃', number: 8, type: '1' },
  48: { color: '1', cardName: '桃', number: 9, type: '1' },
  49: { color: '1', cardName: '杀', number: 10, type: '1' },
  50: { color: '1', cardName: '杀', number: 11, type: '1' },
  51: { color: '1', cardName: '桃', number: 12, type: '1' },
  52: { color: '1', cardName: '爪黄', number: 13, type: '3' },
  53: { color: '4', cardName: '决斗', number: 1, type: '2' },
  54: { color: '4', cardName: '杀', number: 2, type: '1' },
  55: { color: '4', cardName: '杀', number: 3, type: '1' },
  56: { color: '4', cardName: '杀', number: 4, type: '1' },
  57: { color: '4', cardName: '杀', number: 5, type: '1' },
  58: { color: '4', cardName: '杀', number: 6, type: '1' },
  59: { color: '4', cardName: '杀', number: 7, type: '1' },
  60: { color: '4', cardName: '杀', number: 8, type: '1' },
  61: { color: '4', cardName: '杀', number: 9, type: '1' },
  62: { color: '4', cardName: '杀', number: 10, type: '1' },
  63: { color: '4', cardName: '杀', number: 11, type: '1' },
  64: { color: '4', cardName: '无懈', number: 12, type: '2' },
  65: { color: '4', cardName: '无懈', number: 13, type: '2' },
  66: { color: '4', cardName: '连弩', number: 1, type: '3' },
  67: { color: '4', cardName: '八卦', number: 2, type: '3' },
  68: { color: '4', cardName: '过拆', number: 3, type: '2' },
  69: { color: '4', cardName: '过拆', number: 4, type: '2' },
  70: { color: '4', cardName: '的卢', number: 5, type: '3' },
  71: { color: '4', cardName: '乐', number: 6, type: '2' },
  72: { color: '4', cardName: '南蛮', number: 7, type: '2' },
  73: { color: '4', cardName: '杀', number: 8, type: '1' },
  74: { color: '4', cardName: '杀', number: 9, type: '1' },
  75: { color: '4', cardName: '杀', number: 10, type: '1' },
  76: { color: '4', cardName: '杀', number: 11, type: '1' },
  77: { color: '4', cardName: '借刀', number: 12, type: '2' },
  78: { color: '4', cardName: '借刀', number: 13, type: '2' },
  79: { color: '3', cardName: '决斗', number: 1, type: '2' },
  80: { color: '3', cardName: '雌雄', number: 2, type: '3' },
  81: { color: '3', cardName: '顺手', number: 3, type: '2' },
  82: { color: '3', cardName: '顺手', number: 4, type: '2' },
  83: { color: '3', cardName: '绝影', number: 5, type: '3' },
  84: { color: '3', cardName: '青釭', number: 6, type: '3' },
  85: { color: '3', cardName: '杀', number: 7, type: '1' },
  86: { color: '3', cardName: '杀', number: 8, type: '1' },
  87: { color: '3', cardName: '杀', number: 9, type: '1' },
  88: { color: '3', cardName: '杀', number: 10, type: '1' },
  89: { color: '3', cardName: '顺手', number: 11, type: '2' },
  90: { color: '3', cardName: '过拆', number: 12, type: '2' },
  91: { color: '3', cardName: '南蛮', number: 13, type: '2' },
  92: { color: '3', cardName: '闪电', number: 1, type: '2' },
  93: { color: '3', cardName: '八卦', number: 2, type: '3' },
  94: { color: '3', cardName: '过拆', number: 3, type: '2' },
  95: { color: '3', cardName: '过拆', number: 4, type: '2' },
  96: { color: '3', cardName: '青龙', number: 5, type: '3' },
  97: { color: '3', cardName: '乐', number: 6, type: '2' },
  98: { color: '3', cardName: '南蛮', number: 7, type: '2' },
  99: { color: '3', cardName: '杀', number: 8, type: '1' },
  100: { color: '3', cardName: '杀', number: 9, type: '1' },
  101: { color: '3', cardName: '杀', number: 10, type: '1' },
  102: { color: '3', cardName: '无懈', number: 11, type: '2' },
  103: { color: '3', cardName: '丈八', number: 12, type: '3' },
  104: { color: '3', cardName: '大宛', number: 13, type: '3' },
  105: { color: '1', cardName: '闪电', number: 12, type: '2' },
  106: { color: '2', cardName: '无懈', number: 12, type: '2' },
  107: { color: '4', cardName: '仁王', number: 2, type: '3' },
  108: { color: '3', cardName: '寒冰', number: 2, type: '3' },
  109: { color: '1', cardName: '无懈', number: 1, type: '2' },
  110: { color: '1', cardName: '火攻', number: 2, type: '2' },
  111: { color: '1', cardName: '火攻', number: 3, type: '2' },
  112: { color: '1', cardName: '火杀', number: 4, type: '1' },
  113: { color: '1', cardName: '桃', number: 5, type: '1' },
  114: { color: '1', cardName: '桃', number: 6, type: '1' },
  115: { color: '1', cardName: '火杀', number: 7, type: '1' },
  116: { color: '1', cardName: '闪', number: 8, type: '1' },
  117: { color: '1', cardName: '闪', number: 9, type: '1' },
  118: { color: '1', cardName: '火杀', number: 10, type: '1' },
  119: { color: '1', cardName: '闪', number: 11, type: '1' },
  120: { color: '1', cardName: '闪', number: 12, type: '1' },
  121: { color: '1', cardName: '无懈', number: 13, type: '2' },
  122: { color: '2', cardName: '朱雀', number: 1, type: '3' },
  123: { color: '2', cardName: '桃', number: 2, type: '1' },
  124: { color: '2', cardName: '桃', number: 3, type: '1' },
  125: { color: '2', cardName: '火杀', number: 4, type: '1' },
  126: { color: '2', cardName: '火杀', number: 5, type: '1' },
  127: { color: '2', cardName: '闪', number: 6, type: '1' },
  128: { color: '2', cardName: '闪', number: 7, type: '1' },
  129: { color: '2', cardName: '闪', number: 8, type: '1' },
  130: { color: '2', cardName: '酒', number: 9, type: '1' },
  131: { color: '2', cardName: '闪', number: 10, type: '1' },
  132: { color: '2', cardName: '闪', number: 11, type: '1' },
  133: { color: '2', cardName: '火攻', number: 12, type: '2' },
  134: { color: '2', cardName: '骅骝', number: 13, type: '3' },
  135: { color: '3', cardName: '古锭', number: 1, type: '3' },
  136: { color: '3', cardName: '藤甲', number: 2, type: '3' },
  137: { color: '3', cardName: '酒', number: 3, type: '1' },
  138: { color: '3', cardName: '雷杀', number: 4, type: '1' },
  139: { color: '3', cardName: '雷杀', number: 5, type: '1' },
  140: { color: '3', cardName: '雷杀', number: 6, type: '1' },
  141: { color: '3', cardName: '雷杀', number: 7, type: '1' },
  142: { color: '3', cardName: '雷杀', number: 8, type: '1' },
  143: { color: '3', cardName: '酒', number: 9, type: '1' },
  144: { color: '3', cardName: '兵', number: 10, type: '2' },
  145: { color: '3', cardName: '铁索', number: 11, type: '2' },
  146: { color: '3', cardName: '铁索', number: 12, type: '2' },
  147: { color: '3', cardName: '无懈', number: 13, type: '2' },
  148: { color: '4', cardName: '白银', number: 1, type: '3' },
  149: { color: '4', cardName: '藤甲', number: 2, type: '3' },
  150: { color: '4', cardName: '酒', number: 3, type: '1' },
  151: { color: '4', cardName: '兵', number: 4, type: '2' },
  152: { color: '4', cardName: '雷杀', number: 5, type: '1' },
  153: { color: '4', cardName: '雷杀', number: 6, type: '1' },
  154: { color: '4', cardName: '雷杀', number: 7, type: '1' },
  155: { color: '4', cardName: '雷杀', number: 8, type: '1' },
  156: { color: '4', cardName: '酒', number: 9, type: '1' },
  157: { color: '4', cardName: '铁索', number: 10, type: '2' },
  158: { color: '4', cardName: '铁索', number: 11, type: '2' },
  159: { color: '4', cardName: '铁索', number: 12, type: '2' },
  160: { color: '4', cardName: '铁索', number: 13, type: '2' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' },
  4400: { id: 4400, cardName: '回魂', type: 2, subType: 0, exType: 0, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1332, res: 'HuiHun', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8' },
  4401: { id: 4401, cardName: '回魂', type: 2, subType: 0, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1332, res: 'HuiHun', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8' }
}

let JunZhengYingBian = {
  0: { id: 0, cardName: '?', type: '', subType: 9, exType: 27, number: '', color: '', attRange: 0, attDistance: 0, defDistance: 0, spellId: 700, res: 'MuNiuLiuMa' },
  161: { id: 161, cardName: '木马', type: 3, subType: 9, exType: 27, number: 5, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 700, res: 'MuNiuLiuMa' },
  7001: { id: 7001, cardName: '决斗', type: 2, subType: 0, exType: 47, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, imageId: 8, res: 'JueDou', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_19,8_9,3_13,8_23,8_54,6' },
  7002: { id: 7002, cardName: '顺手', type: 2, subType: 0, exType: 47, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 4, imageId: 4, res: 'ShunShouQianYang', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8' },
  7003: { id: 7003, cardName: '顺手', type: 2, subType: 0, exType: 47, number: 4, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 4, imageId: 4, res: 'ShunShouQianYang', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8' },
  7004: { id: 7004, cardName: '贯石', type: 3, subType: 1, exType: 47, number: 5, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 28, imageId: 28, res: 'GuanShiFu', Grade1: '10,13', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_26,5_34,8' },
  7005: { id: 7005, cardName: '杀', type: 1, subType: 0, exType: 47, number: 6, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7006: { id: 7006, cardName: '杀', type: 1, subType: 0, exType: 47, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7007: { id: 7007, cardName: '杀', type: 1, subType: 0, exType: 47, number: 9, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7008: { id: 7008, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6_38,4_46,4_152,4' },
  7009: { id: 7009, cardName: '紫騂', type: 3, subType: 4, exType: 47, number: 13, color: 2, attRange: 0, attDistance: 1, defDistance: 0, spellId: 18, imageId: 18, res: 'ZiXing', Grade1: '10,12', Grade2: '4,6', Grade3: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_27,8_38,6_46,6_152,6' },
  7010: { id: 7010, cardName: '连弩', type: 3, subType: 1, exType: 47, number: 1, color: 2, attRange: 1, attDistance: 0, defDistance: 0, spellId: 23, imageId: 23, res: 'ZhuGeLianNu', Grade1: '10,12', Grade2: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_11,12_10,12_34,8' },
  7011: { id: 7011, cardName: '闪', type: 1, subType: 0, exType: 47, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7012: { id: 7012, cardName: '闪', type: 1, subType: 0, exType: 47, number: 5, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7013: { id: 7013, cardName: '闪', type: 1, subType: 0, exType: 47, number: 6, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7014: { id: 7014, cardName: '闪', type: 1, subType: 0, exType: 47, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7015: { id: 7015, cardName: '闪', type: 1, subType: 0, exType: 47, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7016: { id: 7016, cardName: '闪', type: 1, subType: 0, exType: 47, number: 9, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7017: { id: 7017, cardName: '闪', type: 1, subType: 0, exType: 47, number: 10, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7018: { id: 7018, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6_38,4_46,4_152,4' },
  7019: { id: 7019, cardName: '桃', type: 1, subType: 0, exType: 47, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,8_11,7_13,8_20,8_35,8_38,5_46,5_152,5' },
  7020: { id: 7020, cardName: '杀', type: 1, subType: 0, exType: 47, number: 13, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_38,6_46,6_152,6_54,6' },
  7021: { id: 7021, cardName: '五谷', type: 2, subType: 0, exType: 47, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6, imageId: 6, res: 'WuGuFengDeng', Grade1: '10,14', Grade2: '10,14', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7022: { id: 7022, cardName: '赤兔', type: 3, subType: 4, exType: 47, number: 5, color: 1, attRange: 0, attDistance: 1, defDistance: 0, spellId: 17, imageId: 17, res: 'ChiTu', Grade1: '10,12', Grade2: '4,6', Grade3: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_27,8_30,5_154,7' },
  7023: { id: 7023, cardName: '乐', type: 2, subType: 5, exType: 47, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, imageId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '16,20', Grade2: '14,16', Grade3: '9,11', Specials: '2,4_106,4_22,6_30,5_154,7' },
  7024: { id: 7024, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7025: { id: 7025, cardName: '过拆', type: 2, subType: 0, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, imageId: 5, res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_38,5_46,5_152,5_154,7' },
  7026: { id: 7026, cardName: '闪', type: 1, subType: 0, exType: 47, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_38,6_46,6_152,6_154,7' },
  7027: { id: 7027, cardName: '桃', type: 1, subType: 0, exType: 47, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7028: { id: 7028, cardName: '桃', type: 1, subType: 0, exType: 47, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7029: { id: 7029, cardName: '麒麟', type: 3, subType: 1, exType: 47, number: 5, color: 1, attRange: 5, attDistance: 0, defDistance: 0, spellId: 30, imageId: 30, res: 'QiLinGong', Grade1: '10,14', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_26,6_30,5_34,8_154,7' },
  7030: { id: 7030, cardName: '桃', type: 1, subType: 0, exType: 47, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7031: { id: 7031, cardName: '桃', type: 1, subType: 0, exType: 47, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7032: { id: 7032, cardName: '桃', type: 1, subType: 0, exType: 47, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7033: { id: 7033, cardName: '桃', type: 1, subType: 0, exType: 47, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7034: { id: 7034, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7035: { id: 7035, cardName: '杀', type: 1, subType: 0, exType: 47, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_38,4_46,4_152,4_154,7_54,6' },
  7036: { id: 7036, cardName: '桃', type: 1, subType: 0, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_38,5_46,5_152,5_154,7' },
  7037: { id: 7037, cardName: '爪黄', type: 3, subType: 3, exType: 47, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 1, spellId: 22, imageId: 22, res: 'ZhuaHuangFeiDian', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_30,5_38,6_46,6_152,6_154,7' },
  7038: { id: 7038, cardName: '杀', type: 1, subType: 0, exType: 47, number: 6, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7039: { id: 7039, cardName: '杀', type: 1, subType: 0, exType: 47, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7040: { id: 7040, cardName: '杀', type: 1, subType: 0, exType: 47, number: 8, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7041: { id: 7041, cardName: '杀', type: 1, subType: 0, exType: 47, number: 11, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_38,4_46,4_152,4_42,6' },
  7042: { id: 7042, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_36,6_38,5_46,5_152,5' },
  7043: { id: 7043, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 13, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_36,6_38,6_46,6_152,6' },
  7044: { id: 7044, cardName: '连弩', type: 3, subType: 1, exType: 47, number: 1, color: 4, attRange: 1, attDistance: 0, defDistance: 0, spellId: 23, imageId: 23, res: 'ZhuGeLianNu', Grade1: '10,12', Grade2: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_11,12_10,12_34,8_36,6_42,7' },
  7045: { id: 7045, cardName: '的卢', type: 3, subType: 3, exType: 47, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 1, spellId: 21, imageId: 21, res: 'DiLu', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7046: { id: 7046, cardName: '乐', type: 2, subType: 5, exType: 47, number: 6, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, imageId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '16,20', Grade2: '14,16', Grade3: '9,11', Specials: '21,5_9,7_36,6' },
  7047: { id: 7047, cardName: '杀', type: 1, subType: 0, exType: 47, number: 8, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7048: { id: 7048, cardName: '雌雄', type: 3, subType: 1, exType: 47, number: 2, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 24, imageId: 24, res: 'CiXiongShuangGuJian', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7049: { id: 7049, cardName: '绝影', type: 3, subType: 3, exType: 47, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 1, spellId: 20, imageId: 20, res: 'JueYing', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7050: { id: 7050, cardName: '青釭', type: 3, subType: 1, exType: 47, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 25, imageId: 25, res: 'QingGangJian', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7051: { id: 7051, cardName: '八卦', type: 3, subType: 2, exType: 47, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 16, imageId: 16, res: 'BaGuaZhen', Grade1: '12,17', Grade2: '5,8', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7052: { id: 7052, cardName: '过拆', type: 2, subType: 0, exType: 47, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, imageId: 5, res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7' },
  7053: { id: 7053, cardName: '青龙', type: 3, subType: 1, exType: 47, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 26, imageId: 26, res: 'QingLongYanYueDao', Grade1: '10,13', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,5_30,5_32,5_45,7_34,8_42,7' },
  7054: { id: 7054, cardName: '乐', type: 2, subType: 5, exType: 47, number: 6, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, imageId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '16,20', Grade2: '14,16', Grade3: '9,11', Specials: '21,5_9,7_30,5_32,5_45,7' },
  7055: { id: 7055, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7056: { id: 7056, cardName: '丈八', type: 3, subType: 1, exType: 47, number: 12, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 27, imageId: 27, res: 'ZhangBaSheMao', Grade1: '10,13', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,5_30,5_32,5_45,7_34,8_38,5_46,5_152,5_42,7' },
  7057: { id: 7057, cardName: '大宛', type: 3, subType: 4, exType: 47, number: 13, color: 3, attRange: 0, attDistance: 1, defDistance: 0, spellId: 19, imageId: 19, res: 'DaWan', Grade1: '10,12', Grade2: '4,6', Grade3: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_27,8_30,5_32,5_45,7_38,6_46,6_152,6_42,7' },
  7058: { id: 7058, cardName: '闪电', type: 2, subType: 5, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 11, imageId: 11, cardClass: 'DelayedJinNangCard', res: 'ShanDian', Grade1: '5,7', Grade2: '2,5', Specials: '2,4_106,4_22,6_30,5_38,5_46,5_152,5_154,7' },
  7059: { id: 7059, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8_38,5_46,5_152,5' },
  7060: { id: 7060, cardName: '仁王', type: 3, subType: 2, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 200, imageId: 200, res: 'RenWangDun', Grade1: '13,18', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7061: { id: 7061, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7062: { id: 7062, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6,5,7_105,5_39,5_26,5_6,2_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7063: { id: 7063, cardName: '桃', type: 1, subType: 0, exType: 47, number: 5, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7064: { id: 7064, cardName: '桃', type: 1, subType: 0, exType: 47, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7065: { id: 7065, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6,5,7_105,5_39,5_26,5_6,2_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7066: { id: 7066, cardName: '闪', type: 1, subType: 0, exType: 47, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7067: { id: 7067, cardName: '闪', type: 1, subType: 0, exType: 47, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7068: { id: 7068, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_38,4_46,4_152,4_154,7' },
  7069: { id: 7069, cardName: '闪', type: 1, subType: 0, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_38,5_46,5_152,5_154,7' },
  7070: { id: 7070, cardName: '桃', type: 1, subType: 0, exType: 47, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,8_11,7_13,8_20,8_35,8' },
  7071: { id: 7071, cardName: '桃', type: 1, subType: 0, exType: 47, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,8_11,7_13,8_20,8_35,8' },
  7072: { id: 7072, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 5, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6,5,7_105,5_39,5_26,5_6,2_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7073: { id: 7073, cardName: '闪', type: 1, subType: 0, exType: 47, number: 6, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7074: { id: 7074, cardName: '闪', type: 1, subType: 0, exType: 47, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7075: { id: 7075, cardName: '闪', type: 1, subType: 0, exType: 47, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7076: { id: 7076, cardName: '酒', type: 1, subType: 0, exType: 47, number: 9, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2,4_106,4_22,6_20,6_13,8_11,5' },
  7077: { id: 7077, cardName: '闪', type: 1, subType: 0, exType: 47, number: 10, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7078: { id: 7078, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6_38,4_46,4_152,4' },
  7079: { id: 7079, cardName: '骅骝', type: 3, subType: 3, exType: 47, number: 13, color: 2, attRange: 0, attDistance: 0, defDistance: 1, spellId: 90, res: 'HuaLiu', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_38,6_46,6_152,6' },
  7080: { id: 7080, cardName: '古锭', type: 3, subType: 1, exType: 47, number: 1, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 86, res: 'GuDingDao', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7081: { id: 7081, cardName: '藤甲', type: 3, subType: 2, exType: 47, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 88, res: 'TengJia', Grade1: '7,9', Grade2: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7082: { id: 7082, cardName: '酒', type: 1, subType: 0, exType: 47, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_30,5_32,5_42,6' },
  7083: { id: 7083, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7084: { id: 7084, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7085: { id: 7085, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 6, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7086: { id: 7086, cardName: '酒', type: 1, subType: 0, exType: 47, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_30,5_32,5_42,6' },
  7087: { id: 7087, cardName: '兵', type: 2, subType: 5, exType: 47, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 84, cardClass: 'DelayedJinNangCard', res: 'BingLiangCunDuan', Grade1: '16,20', Grade2: '14,16', Grade3: '12,14', Grade4: '10,12', Specials: '21,5_9,7_30,5_32,5_45,7_42,5' },
  7088: { id: 7088, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7089: { id: 7089, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 12, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,5_46,5_152,5' },
  7090: { id: 7090, cardName: '藤甲', type: 3, subType: 2, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 88, res: 'TengJia', Grade1: '7,9', Grade2: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7091: { id: 7091, cardName: '酒', type: 1, subType: 0, exType: 47, number: 3, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_36,6_42,6' },
  7092: { id: 7092, cardName: '兵', type: 2, subType: 5, exType: 47, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 84, cardClass: 'DelayedJinNangCard', res: 'BingLiangCunDuan', Grade1: '16,20', Grade2: '14,16', Grade3: '12,14', Grade4: '10,12', Specials: '21,5_9,7_36,6_42,5' },
  7093: { id: 7093, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7094: { id: 7094, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 6, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7095: { id: 7095, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7096: { id: 7096, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 8, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7097: { id: 7097, cardName: '酒', type: 1, subType: 0, exType: 47, number: 9, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_36,6_42,6' },
  7098: { id: 7098, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 10, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7' },
  7099: { id: 7099, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 11, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_38,4_46,4_152,4' },
  7100: { id: 7100, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_38,5_46,5_152,5' },
  7101: { id: 7101, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 13, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_38,6_46,6_152,6' },
  7102: { id: 7102, cardName: '决斗', type: 2, subType: 0, exType: 47, number: 1, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, imageId: 8, cardClass: 'JinNangCard', res: 'JueDou', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_30,5_32,5_45,7_54,6' },
  7103: { id: 7103, cardName: '太公', type: 3, subType: 9, exType: 47, number: 1, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7104: { id: 7104, cardName: '随机', type: 2, subType: 0, exType: 47, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6006, imageId: 6006, cardClass: 'SuiJiYingBianNCard', res: 'SuiJiYingBian', Grade1: '23,25', Grade2: '12,15' },
  7105: { id: 7105, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7106: { id: 7106, cardName: '水淹', type: 2, subType: 0, exType: 47, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6004, imageId: 6004, cardClass: 'JinNangCard', res: 'ShuiYanQiJun2', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_30,5_32,5_45,7_54,6' },
  7107: { id: 7107, cardName: '水淹', type: 2, subType: 0, exType: 47, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6004, imageId: 6004, cardClass: 'JinNangCard', res: 'ShuiYanQiJun2', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_30,5_32,5_45,7_54,6' },
  7108: { id: 7108, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7109: { id: 7109, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7110: { id: 7110, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7111: { id: 7111, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7112: { id: 7112, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7113: { id: 7113, cardName: '杀', type: 1, subType: 0, exType: 47, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7114: { id: 7114, cardName: '杀', type: 1, subType: 0, exType: 47, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7115: { id: 7115, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7116: { id: 7116, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7117: { id: 7117, cardName: '顺手', type: 2, subType: 0, exType: 47, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 4, imageId: 4, res: 'ShunShouQianYang', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7118: { id: 7118, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 12, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3024, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7119: { id: 7119, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 13, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3025, spellId: 13, imageId: 13, cardClass: 'JinNangCard', res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7120: { id: 7120, cardName: '天机', type: 3, subType: 9, exType: 47, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7121: { id: 7121, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7122: { id: 7122, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7123: { id: 7123, cardName: '过拆', type: 2, subType: 0, exType: 47, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, imageId: 5, cardClass: 'JinNangCard', res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_36,6' },
  7124: { id: 7124, cardName: '出其', type: 2, subType: 0, exType: 47, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6000, imageId: 6000, cardClass: 'JinNangCard', res: 'ChuQiBuYi', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_19,8_9,3_13,8_23,8_54,6' },
  7125: { id: 7125, cardName: '五谷', type: 2, subType: 0, exType: 47, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6, imageId: 6, res: 'WuGuFengDeng', Grade1: '10,14', Grade2: '10,14', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7126: { id: 7126, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7127: { id: 7127, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7128: { id: 7128, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7129: { id: 7129, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3023, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7130: { id: 7130, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7131: { id: 7131, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3021, spellId: 13, imageId: 13, cardClass: 'JinNangCard', res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_38,6_46,6_152,6_154,7' },
  7132: { id: 7132, cardName: '决斗', type: 2, subType: 0, exType: 47, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, imageId: 8, cardClass: 'JinNangCard', res: 'JueDou', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_36,6_54,6' },
  7133: { id: 7133, cardName: '护心', type: 3, subType: 2, exType: 47, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7134: { id: 7134, cardName: '杀', type: 1, subType: 0, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7135: { id: 7135, cardName: '黑光', type: 3, subType: 2, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7136: { id: 7136, cardName: '杀', type: 1, subType: 0, exType: 47, number: 3, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7137: { id: 7137, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 3, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_36,6' },
  7138: { id: 7138, cardName: '杀', type: 1, subType: 0, exType: 47, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7139: { id: 7139, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_36,6' },
  7140: { id: 7140, cardName: '杀', type: 1, subType: 0, exType: 47, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7141: { id: 7141, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 9, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7142: { id: 7142, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 9, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7143: { id: 7143, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 10, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7144: { id: 7144, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 10, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7145: { id: 7145, cardName: '杀', type: 1, subType: 0, exType: 47, number: 11, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7146: { id: 7146, cardName: '铜雀', type: 3, subType: 9, exType: 47, number: 13, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6013, imageId: 6013, cardClass: 'EquipCard', res: 'TongQue', Grade1: '13,16', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7147: { id: 7147, cardName: '五行', type: 3, subType: 1, exType: 47, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_26,6_34,8' },
  7148: { id: 7148, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7149: { id: 7149, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7150: { id: 7150, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 4, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3023, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7151: { id: 7151, cardName: '杀', type: 1, subType: 0, exType: 47, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3024, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7152: { id: 7152, cardName: '杀', type: 1, subType: 6, exType: 47, number: 10, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7153: { id: 7153, cardName: '出其', type: 2, subType: 0, exType: 47, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6000, imageId: 6000, cardClass: 'JinNangCard', res: 'ChuQiBuYi', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_19,8_9,3_13,8_23,8_54,6' },
  7154: { id: 7154, cardName: '乌铁', type: 3, subType: 1, exType: 47, number: 12, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', CanLianHeng: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_26,5_34,8' },
  7155: { id: 7155, cardName: '南蛮', type: 2, subType: 0, exType: 47, number: 13, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  7156: { id: 7156, cardName: '南蛮', type: 2, subType: 0, exType: 47, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  7157: { id: 7157, cardName: '桃园', type: 2, subType: 0, exType: 47, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 12, imageId: 12, res: 'TaoYuanJieYi', Grade1: '8,12', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7158: { id: 7158, cardName: '万箭', type: 2, subType: 0, exType: 47, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 10, imageId: 10, res: 'WanJianQiFa', Grade1: '14,17', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7159: { id: 7159, cardName: '南蛮', type: 2, subType: 0, exType: 47, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  7160: { id: 7160, cardName: '闪', type: 1, subType: 0, exType: 47, number: 4, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3021, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' }
}

let ShenZhiShiLian = {
  0: { id: 0, cardName: '?', type: '', subType: 9, exType: 27, number: '', color: '', attRange: 0, attDistance: 0, defDistance: 0, spellId: 700, res: 'MuNiuLiuMa' },
  161: { id: 161, cardName: '木马', type: 3, subType: 9, exType: 27, number: 5, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 700, res: 'MuNiuLiuMa' },
  201: { id: 201, name: '洪荒之力', type: 2, subType: 0, exType: 0, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1100, res: 'HongHuangZhiLi' },
  7001: { id: 7001, cardName: '决斗', type: 2, subType: 0, exType: 47, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, imageId: 8, res: 'JueDou', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_19,8_9,3_13,8_23,8_54,6' },
  7002: { id: 7002, cardName: '顺手', type: 2, subType: 0, exType: 47, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 4, imageId: 4, res: 'ShunShouQianYang', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8' },
  7003: { id: 7003, cardName: '顺手', type: 2, subType: 0, exType: 47, number: 4, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 4, imageId: 4, res: 'ShunShouQianYang', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8' },
  7004: { id: 7004, cardName: '贯石', type: 3, subType: 1, exType: 47, number: 5, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 28, imageId: 28, res: 'GuanShiFu', Grade1: '10,13', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_26,5_34,8' },
  7005: { id: 7005, cardName: '杀', type: 1, subType: 0, exType: 47, number: 6, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7006: { id: 7006, cardName: '杀', type: 1, subType: 0, exType: 47, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7007: { id: 7007, cardName: '杀', type: 1, subType: 0, exType: 47, number: 9, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7008: { id: 7008, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6_38,4_46,4_152,4' },
  7009: { id: 7009, cardName: '紫騂', type: 3, subType: 4, exType: 47, number: 13, color: 2, attRange: 0, attDistance: 1, defDistance: 0, spellId: 18, imageId: 18, res: 'ZiXing', Grade1: '10,12', Grade2: '4,6', Grade3: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_27,8_38,6_46,6_152,6' },
  7010: { id: 7010, cardName: '连弩', type: 3, subType: 1, exType: 47, number: 1, color: 2, attRange: 1, attDistance: 0, defDistance: 0, spellId: 23, imageId: 23, res: 'ZhuGeLianNu', Grade1: '10,12', Grade2: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_11,12_10,12_34,8' },
  7011: { id: 7011, cardName: '闪', type: 1, subType: 0, exType: 47, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7012: { id: 7012, cardName: '闪', type: 1, subType: 0, exType: 47, number: 5, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7013: { id: 7013, cardName: '闪', type: 1, subType: 0, exType: 47, number: 6, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7014: { id: 7014, cardName: '闪', type: 1, subType: 0, exType: 47, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7015: { id: 7015, cardName: '闪', type: 1, subType: 0, exType: 47, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7016: { id: 7016, cardName: '闪', type: 1, subType: 0, exType: 47, number: 9, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7017: { id: 7017, cardName: '闪', type: 1, subType: 0, exType: 47, number: 10, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7018: { id: 7018, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6_38,4_46,4_152,4' },
  7019: { id: 7019, cardName: '桃', type: 1, subType: 0, exType: 47, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,8_11,7_13,8_20,8_35,8_38,5_46,5_152,5' },
  7020: { id: 7020, cardName: '杀', type: 1, subType: 0, exType: 47, number: 13, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_38,6_46,6_152,6_54,6' },
  7021: { id: 7021, cardName: '五谷', type: 2, subType: 0, exType: 47, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6, imageId: 6, res: 'WuGuFengDeng', Grade1: '10,14', Grade2: '10,14', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7022: { id: 7022, cardName: '赤兔', type: 3, subType: 4, exType: 47, number: 5, color: 1, attRange: 0, attDistance: 1, defDistance: 0, spellId: 17, imageId: 17, res: 'ChiTu', Grade1: '10,12', Grade2: '4,6', Grade3: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_27,8_30,5_154,7' },
  7023: { id: 7023, cardName: '乐', type: 2, subType: 5, exType: 47, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, imageId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '16,20', Grade2: '14,16', Grade3: '9,11', Specials: '2,4_106,4_22,6_30,5_154,7' },
  7024: { id: 7024, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7025: { id: 7025, cardName: '过拆', type: 2, subType: 0, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, imageId: 5, res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_38,5_46,5_152,5_154,7' },
  7026: { id: 7026, cardName: '闪', type: 1, subType: 0, exType: 47, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_38,6_46,6_152,6_154,7' },
  7027: { id: 7027, cardName: '桃', type: 1, subType: 0, exType: 47, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7028: { id: 7028, cardName: '桃', type: 1, subType: 0, exType: 47, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7029: { id: 7029, cardName: '麒麟', type: 3, subType: 1, exType: 47, number: 5, color: 1, attRange: 5, attDistance: 0, defDistance: 0, spellId: 30, imageId: 30, res: 'QiLinGong', Grade1: '10,14', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_26,6_30,5_34,8_154,7' },
  7030: { id: 7030, cardName: '桃', type: 1, subType: 0, exType: 47, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7031: { id: 7031, cardName: '桃', type: 1, subType: 0, exType: 47, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7032: { id: 7032, cardName: '桃', type: 1, subType: 0, exType: 47, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7033: { id: 7033, cardName: '桃', type: 1, subType: 0, exType: 47, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_20,8_35,8_11,7_30,5_33,7_154,7' },
  7034: { id: 7034, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7035: { id: 7035, cardName: '杀', type: 1, subType: 0, exType: 47, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_38,4_46,4_152,4_154,7_54,6' },
  7036: { id: 7036, cardName: '桃', type: 1, subType: 0, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, imageId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_38,5_46,5_152,5_154,7' },
  7037: { id: 7037, cardName: '爪黄', type: 3, subType: 3, exType: 47, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 1, spellId: 22, imageId: 22, res: 'ZhuaHuangFeiDian', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_30,5_38,6_46,6_152,6_154,7' },
  7038: { id: 7038, cardName: '杀', type: 1, subType: 0, exType: 47, number: 6, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7039: { id: 7039, cardName: '杀', type: 1, subType: 0, exType: 47, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7040: { id: 7040, cardName: '杀', type: 1, subType: 0, exType: 47, number: 8, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7041: { id: 7041, cardName: '杀', type: 1, subType: 0, exType: 47, number: 11, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_38,4_46,4_152,4_42,6' },
  7042: { id: 7042, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_36,6_38,5_46,5_152,5' },
  7043: { id: 7043, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 13, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_36,6_38,6_46,6_152,6' },
  7044: { id: 7044, cardName: '连弩', type: 3, subType: 1, exType: 47, number: 1, color: 4, attRange: 1, attDistance: 0, defDistance: 0, spellId: 23, imageId: 23, res: 'ZhuGeLianNu', Grade1: '10,12', Grade2: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_11,12_10,12_34,8_36,6_42,7' },
  7045: { id: 7045, cardName: '的卢', type: 3, subType: 3, exType: 47, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 1, spellId: 21, imageId: 21, res: 'DiLu', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7046: { id: 7046, cardName: '乐', type: 2, subType: 5, exType: 47, number: 6, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, imageId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '16,20', Grade2: '14,16', Grade3: '9,11', Specials: '21,5_9,7_36,6' },
  7047: { id: 7047, cardName: '杀', type: 1, subType: 0, exType: 47, number: 8, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7048: { id: 7048, cardName: '雌雄', type: 3, subType: 1, exType: 47, number: 2, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 24, imageId: 24, res: 'CiXiongShuangGuJian', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7049: { id: 7049, cardName: '绝影', type: 3, subType: 3, exType: 47, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 1, spellId: 20, imageId: 20, res: 'JueYing', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7050: { id: 7050, cardName: '青釭', type: 3, subType: 1, exType: 47, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 25, imageId: 25, res: 'QingGangJian', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7051: { id: 7051, cardName: '八卦', type: 3, subType: 2, exType: 47, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 16, imageId: 16, res: 'BaGuaZhen', Grade1: '12,17', Grade2: '5,8', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7052: { id: 7052, cardName: '过拆', type: 2, subType: 0, exType: 47, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, imageId: 5, res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7' },
  7053: { id: 7053, cardName: '青龙', type: 3, subType: 1, exType: 47, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 26, imageId: 26, res: 'QingLongYanYueDao', Grade1: '10,13', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,5_30,5_32,5_45,7_34,8_42,7' },
  7054: { id: 7054, cardName: '乐', type: 2, subType: 5, exType: 47, number: 6, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, imageId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '16,20', Grade2: '14,16', Grade3: '9,11', Specials: '21,5_9,7_30,5_32,5_45,7' },
  7055: { id: 7055, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7056: { id: 7056, cardName: '丈八', type: 3, subType: 1, exType: 47, number: 12, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 27, imageId: 27, res: 'ZhangBaSheMao', Grade1: '10,13', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,5_30,5_32,5_45,7_34,8_38,5_46,5_152,5_42,7' },
  7057: { id: 7057, cardName: '大宛', type: 3, subType: 4, exType: 47, number: 13, color: 3, attRange: 0, attDistance: 1, defDistance: 0, spellId: 19, imageId: 19, res: 'DaWan', Grade1: '10,12', Grade2: '4,6', Grade3: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_27,8_30,5_32,5_45,7_38,6_46,6_152,6_42,7' },
  7058: { id: 7058, cardName: '闪电', type: 2, subType: 5, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 11, imageId: 11, cardClass: 'DelayedJinNangCard', res: 'ShanDian', Grade1: '5,7', Grade2: '2,5', Specials: '2,4_106,4_22,6_30,5_38,5_46,5_152,5_154,7' },
  7059: { id: 7059, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, imageId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2,4_106,4_22,6_7,9_206,-6_13,8_38,5_46,5_152,5' },
  7060: { id: 7060, cardName: '仁王', type: 3, subType: 2, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 200, imageId: 200, res: 'RenWangDun', Grade1: '13,18', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7061: { id: 7061, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7062: { id: 7062, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6,5,7_105,5_39,5_26,5_6,2_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7063: { id: 7063, cardName: '桃', type: 1, subType: 0, exType: 47, number: 5, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7064: { id: 7064, cardName: '桃', type: 1, subType: 0, exType: 47, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,4_11,7_30,5_33,7_20,8_35,8_154,7' },
  7065: { id: 7065, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6,5,7_105,5_39,5_26,5_6,2_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7066: { id: 7066, cardName: '闪', type: 1, subType: 0, exType: 47, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7067: { id: 7067, cardName: '闪', type: 1, subType: 0, exType: 47, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7068: { id: 7068, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_38,4_46,4_152,4_154,7' },
  7069: { id: 7069, cardName: '闪', type: 1, subType: 0, exType: 47, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_38,5_46,5_152,5_154,7' },
  7070: { id: 7070, cardName: '桃', type: 1, subType: 0, exType: 47, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,8_11,7_13,8_20,8_35,8' },
  7071: { id: 7071, cardName: '桃', type: 1, subType: 0, exType: 47, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2,4_106,4_13,8_11,7_13,8_20,8_35,8' },
  7072: { id: 7072, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 5, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6,5,7_105,5_39,5_26,5_6,2_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7073: { id: 7073, cardName: '闪', type: 1, subType: 0, exType: 47, number: 6, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7074: { id: 7074, cardName: '闪', type: 1, subType: 0, exType: 47, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7075: { id: 7075, cardName: '闪', type: 1, subType: 0, exType: 47, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7076: { id: 7076, cardName: '酒', type: 1, subType: 0, exType: 47, number: 9, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2,4_106,4_22,6_20,6_13,8_11,5' },
  7077: { id: 7077, cardName: '闪', type: 1, subType: 0, exType: 47, number: 10, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7078: { id: 7078, cardName: '闪', type: 1, subType: 0, exType: 47, number: 11, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6_38,4_46,4_152,4' },
  7079: { id: 7079, cardName: '骅骝', type: 3, subType: 3, exType: 47, number: 13, color: 2, attRange: 0, attDistance: 0, defDistance: 1, spellId: 90, res: 'HuaLiu', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_38,6_46,6_152,6' },
  7080: { id: 7080, cardName: '古锭', type: 3, subType: 1, exType: 47, number: 1, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 86, res: 'GuDingDao', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7081: { id: 7081, cardName: '藤甲', type: 3, subType: 2, exType: 47, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 88, res: 'TengJia', Grade1: '7,9', Grade2: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7082: { id: 7082, cardName: '酒', type: 1, subType: 0, exType: 47, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_30,5_32,5_42,6' },
  7083: { id: 7083, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7084: { id: 7084, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7085: { id: 7085, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 6, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7086: { id: 7086, cardName: '酒', type: 1, subType: 0, exType: 47, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_30,5_32,5_42,6' },
  7087: { id: 7087, cardName: '兵', type: 2, subType: 5, exType: 47, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 84, cardClass: 'DelayedJinNangCard', res: 'BingLiangCunDuan', Grade1: '16,20', Grade2: '14,16', Grade3: '12,14', Grade4: '10,12', Specials: '21,5_9,7_30,5_32,5_45,7_42,5' },
  7088: { id: 7088, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7089: { id: 7089, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 12, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,5_46,5_152,5' },
  7090: { id: 7090, cardName: '藤甲', type: 3, subType: 2, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 88, res: 'TengJia', Grade1: '7,9', Grade2: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7091: { id: 7091, cardName: '酒', type: 1, subType: 0, exType: 47, number: 3, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_36,6_42,6' },
  7092: { id: 7092, cardName: '兵', type: 2, subType: 5, exType: 47, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 84, cardClass: 'DelayedJinNangCard', res: 'BingLiangCunDuan', Grade1: '16,20', Grade2: '14,16', Grade3: '12,14', Grade4: '10,12', Specials: '21,5_9,7_36,6_42,5' },
  7093: { id: 7093, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7094: { id: 7094, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 6, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7095: { id: 7095, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7096: { id: 7096, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 8, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7097: { id: 7097, cardName: '酒', type: 1, subType: 0, exType: 47, number: 9, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '21,5_9,7_20,6_11,5_36,6_42,6' },
  7098: { id: 7098, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 10, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7' },
  7099: { id: 7099, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 11, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_38,4_46,4_152,4' },
  7100: { id: 7100, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_38,5_46,5_152,5' },
  7101: { id: 7101, cardName: '铁索', type: 2, subType: 0, exType: 47, number: 13, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '14,16', Grade2: '12,14', Grade3: '10,12', Grade4: '8,10', Specials: '7,9_206,-6_21,5_9,7_38,6_46,6_152,6' },
  7102: { id: 7102, cardName: '决斗', type: 2, subType: 0, exType: 47, number: 1, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, imageId: 8, cardClass: 'JinNangCard', res: 'JueDou', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_30,5_32,5_45,7_54,6' },
  7103: { id: 7103, cardName: '太公', type: 3, subType: 9, exType: 47, number: 1, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', Grade2: '4,6', Grade3: '2,4', Grade4: '2,4', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7' },
  7104: { id: 7104, cardName: '随机', type: 2, subType: 0, exType: 47, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6006, imageId: 6006, cardClass: 'SuiJiYingBianNCard', res: 'SuiJiYingBian', Grade1: '23,25', Grade2: '12,15' },
  7105: { id: 7105, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7106: { id: 7106, cardName: '水淹', type: 2, subType: 0, exType: 47, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6004, imageId: 6004, cardClass: 'JinNangCard', res: 'ShuiYanQiJun2', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_30,5_32,5_45,7_54,6' },
  7107: { id: 7107, cardName: '水淹', type: 2, subType: 0, exType: 47, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6004, imageId: 6004, cardClass: 'JinNangCard', res: 'ShuiYanQiJun2', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_30,5_32,5_45,7_54,6' },
  7108: { id: 7108, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7109: { id: 7109, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7110: { id: 7110, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7111: { id: 7111, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7112: { id: 7112, cardName: '冰杀', type: 1, subType: 11, exType: 47, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7113: { id: 7113, cardName: '杀', type: 1, subType: 0, exType: 47, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7114: { id: 7114, cardName: '杀', type: 1, subType: 0, exType: 47, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7115: { id: 7115, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7116: { id: 7116, cardName: '杀', type: 1, subType: 0, exType: 47, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_30,5_32,5_45,7_42,6' },
  7117: { id: 7117, cardName: '顺手', type: 2, subType: 0, exType: 47, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 4, imageId: 4, res: 'ShunShouQianYang', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7118: { id: 7118, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 12, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3024, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '15,20', Grade2: '10,14', Grade3: '6,8', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7119: { id: 7119, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 13, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3025, spellId: 13, imageId: 13, cardClass: 'JinNangCard', res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,4_46,4_152,4' },
  7120: { id: 7120, cardName: '天机', type: 3, subType: 9, exType: 47, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7' },
  7121: { id: 7121, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7122: { id: 7122, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_30,5_32,6_33,7_154,7' },
  7123: { id: 7123, cardName: '过拆', type: 2, subType: 0, exType: 47, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, imageId: 5, cardClass: 'JinNangCard', res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_36,6' },
  7124: { id: 7124, cardName: '出其', type: 2, subType: 0, exType: 47, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6000, imageId: 6000, cardClass: 'JinNangCard', res: 'ChuQiBuYi', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_19,8_9,3_13,8_23,8_54,6' },
  7125: { id: 7125, cardName: '五谷', type: 2, subType: 0, exType: 47, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6, imageId: 6, res: 'WuGuFengDeng', Grade1: '10,14', Grade2: '10,14', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7126: { id: 7126, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7127: { id: 7127, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7128: { id: 7128, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7129: { id: 7129, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3023, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_30,5_33,7_154,7_54,6' },
  7130: { id: 7130, cardName: '洞烛', type: 2, subType: 0, exType: 47, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7131: { id: 7131, cardName: '无懈', type: 2, subType: 0, exType: 47, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3021, spellId: 13, imageId: 13, cardClass: 'JinNangCard', res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_38,6_46,6_152,6_154,7' },
  7132: { id: 7132, cardName: '决斗', type: 2, subType: 0, exType: 47, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, imageId: 8, cardClass: 'JinNangCard', res: 'JueDou', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_19,8_23,8_36,6_54,6' },
  7133: { id: 7133, cardName: '护心', type: 3, subType: 2, exType: 47, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7134: { id: 7134, cardName: '杀', type: 1, subType: 0, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7135: { id: 7135, cardName: '黑光', type: 3, subType: 2, exType: 47, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7136: { id: 7136, cardName: '杀', type: 1, subType: 0, exType: 47, number: 3, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7137: { id: 7137, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 3, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_36,6' },
  7138: { id: 7138, cardName: '杀', type: 1, subType: 0, exType: 47, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7139: { id: 7139, cardName: '逐近', type: 2, subType: 0, exType: 47, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5', Specials: '7,9_206,-6_21,5_9,7_36,6' },
  7140: { id: 7140, cardName: '杀', type: 1, subType: 0, exType: 47, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7141: { id: 7141, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 9, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7142: { id: 7142, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 9, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7143: { id: 7143, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 10, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7144: { id: 7144, cardName: '雷杀', type: 1, subType: 7, exType: 47, number: 10, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'LeiShaNCard', res: 'LeiSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7145: { id: 7145, cardName: '杀', type: 1, subType: 0, exType: 47, number: 11, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_21,5_9,7_36,6_42,6' },
  7146: { id: 7146, cardName: '铜雀', type: 3, subType: 9, exType: 47, number: 13, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6013, imageId: 6013, cardClass: 'EquipCard', res: 'TongQue', Grade1: '13,16', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7' },
  7147: { id: 7147, cardName: '五行', type: 3, subType: 1, exType: 47, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', Specials: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_26,6_34,8' },
  7148: { id: 7148, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7149: { id: 7149, cardName: '闪', type: 1, subType: 0, exType: 47, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  7150: { id: 7150, cardName: '火杀', type: 1, subType: 6, exType: 47, number: 4, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3023, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7151: { id: 7151, cardName: '杀', type: 1, subType: 0, exType: 47, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3024, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7152: { id: 7152, cardName: '杀', type: 1, subType: 6, exType: 47, number: 10, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  7153: { id: 7153, cardName: '出其', type: 2, subType: 0, exType: 47, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6000, imageId: 6000, cardClass: 'JinNangCard', res: 'ChuQiBuYi', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5', Specials: '2,4_106,4_22,6_7,9_206,-6_19,8_9,3_13,8_23,8_54,6' },
  7154: { id: 7154, cardName: '乌铁', type: 3, subType: 1, exType: 47, number: 12, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', CanLianHeng: '2,4_106,4_22,6_25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_13,8_26,5_34,8' },
  7155: { id: 7155, cardName: '南蛮', type: 2, subType: 0, exType: 47, number: 13, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  7156: { id: 7156, cardName: '南蛮', type: 2, subType: 0, exType: 47, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  7157: { id: 7157, cardName: '桃园', type: 2, subType: 0, exType: 47, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 12, imageId: 12, res: 'TaoYuanJieYi', Grade1: '8,12', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7158: { id: 7158, cardName: '万箭', type: 2, subType: 0, exType: 47, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 10, imageId: 10, res: 'WanJianQiFa', Grade1: '14,17', Specials: '2,4_106,4_22,6_7,9_206,-6_30,5_33,7_154,7' },
  7159: { id: 7159, cardName: '南蛮', type: 2, subType: 0, exType: 47, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  7160: { id: 7160, cardName: '闪', type: 1, subType: 0, exType: 47, number: 4, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3021, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2,4_106,4_22,6_5,3_13,8_32,6' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' }
}

let GuoZhanYingBian = {
  0: { id: 0, cardName: '?', type: '', subType: 9, exType: 27, number: '', color: '', attRange: 0, attDistance: 0, defDistance: 0, spellId: 700, res: 'MuNiuLiuMa' },
  1148: { cardName: '玉玺', color: '4', number: 1, type: '1' },
  1150: { cardName: '敕令', color: '4', number: 3, type: '1' },
  1200: { id: 1200, cardName: '决斗', type: 2, subType: 0, exType: 48, number: 1, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 8, res: 'JueDou', Grade1: '12,14', Grade2: '5,7', Grade3: '3,5', Grade4: '1,3', Specials: '2004,5_2006,3_2021,4_2031,4_2039,3_2046,3_2052,4' },
  1201: { id: 1201, cardName: '闪电', type: 2, subType: 5, exType: 48, number: 1, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 11, cardClass: 'DelayedJinNangCard', res: 'ShanDian', Grade1: '3,7', Specials: '2001,5_2006,3_2031,4_2039,3_2052,4' },
  1202: { id: 1202, cardName: '八卦', type: 3, subType: 2, exType: 48, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 16, res: 'BaGuaZhen', Grade1: '14,18', Specials: '2006,3_2007,5_2009,4_2031,4_2037,5_2039,3_2043,2_2052,4' },
  1203: { id: 1203, cardName: '雌雄', type: 3, subType: 1, exType: 48, number: 2, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 24, res: 'CiXiongShuangGuJian', Grade1: '8,11', Specials: '2006,3_2007,5_2009,4_2011,5_2031,4_2037,5_2039,3_2043,2_2052,4' },
  1204: { id: 1204, cardName: '过拆', type: 2, subType: 0, exType: 48, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '6,8', Grade3: '3,5', Grade4: '1,3', Specials: '2006,3_2021,4_2031,4_2039,3_2052,4' },
  1205: { id: 1205, cardName: '绝影', type: 3, subType: 3, exType: 48, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 1, spellId: 20, res: 'JueYing', Grade1: '16,20', Grade2: '8,10', Grade3: '2,4', Specials: '2006,3_2007,5_2009,4_2031,4_2037,5_2039,3_2043,2_2052,4' },
  1206: { id: 1206, cardName: '杀', type: 1, subType: 0, exType: 48, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, res: 'Sha', Grade1: '23,25', Grade2: '10,12', Grade3: '4,7', Grade4: '1,3', Specials: '2006,3_2017_3_2019,3_2031,4_2039,3_2052,4' },
  1207: { id: 1207, cardName: '青釭', type: 3, subType: 1, exType: 48, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 25, res: 'QingGangJian', Grade1: '8,11', Specials: '2006,3_2007,5_2009,4_2011,5_2031,4_2037,5_2039,3_2043,2_2052,4' },
  1208: { id: 1208, cardName: '杀', type: 1, subType: 0, exType: 48, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, res: 'Sha', Grade1: '23,25', Grade2: '10,12', Grade3: '4,7', Grade4: '1,3', Specials: '2006,3_2009,4_2017_3_2019,3_2031,4_2039,3_2052,4' },
  1209: { id: 1209, cardName: '酒', type: 1, subType: 0, exType: 48, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2001,1_2005,2_2009,4_2031,4_2033,3_2039,3_2052,4' },
  1210: { id: 1210, cardName: '杀', type: 1, subType: 0, exType: 48, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, res: 'Sha', Grade1: '23,25', Grade2: '10,12', Grade3: '4,7', Grade4: '1,3', Specials: '2006,3_2009,4_2017_3_2019,3_2031,4_2039,3_2052,4' },
  1211: { id: 1211, cardName: '兵', type: 2, subType: 5, exType: 48, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 84, cardClass: 'DelayedJinNangCard', res: 'BingLiangCunDuan', Grade1: '10,12', Grade2: '3,5', Specials: '2006,3_2031,4_2039,3_2052,4' },
  1212: { id: 1212, cardName: '铁索', type: 2, subType: 0, exType: 48, number: 12, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 85, res: 'TieSuoLianHuan', Grade1: '12,14', Grade2: '5,7', Grade3: '0,4', Specials: '2006,3_2012,3_2028,3_2031,4_2039,3_2040,3_2052,4_2056,3' },
  1213: { id: 1213, cardName: '丈八', type: 3, subType: 1, exType: 48, number: 12, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 27, res: 'ZhangBaSheMao', Grade1: '9,12', Specials: '2006,3_2007,5_2009,4_2011,5_2012,3_2028,3_2031,4_2037,5_2039,3_2040,3_2043,2_2052,4_2056,3' },
  1214: { id: 1214, cardName: '桃园', type: 2, subType: 0, exType: 48, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 12, res: 'TaoYuanJieYi', Grade1: '13,15', Grade2: '8,12', Specials: '2016_2_2021,4_2033,3_2036,2_2039,4_2045,4' },
  1215: { id: 1215, cardName: '万箭', type: 2, subType: 0, exType: 48, number: 1, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 10, res: 'WanJianQiFa', Grade1: '13,15', Specials: '2016_2_2021,4_2036,2_2039,4_2045,4' },
  1216: { id: 1216, cardName: '闪', type: 1, subType: 0, exType: 48, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2016_2_2019,2_2036,2_2039,4_2045,4' },
  1217: { id: 1217, cardName: '五谷', type: 2, subType: 0, exType: 48, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6, res: 'WuGuFengDeng', Grade1: '12,14', Specials: '2016_2_2021,4_2036,2_2039,4_2045,4' },
  1218: { id: 1218, cardName: '桃', type: 1, subType: 0, exType: 48, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2000,2_2001,2_2002,2_2005,5_2012,2_2016_2_2033,5_2036,2_2039,4_2045,4' },
  1219: { id: 1219, cardName: '赤兔', type: 3, subType: 4, exType: 48, number: 5, color: 1, attRange: 0, attDistance: 1, defDistance: 0, spellId: 17, res: 'ChiTu', Grade1: '12,14', Grade2: '5,7', Grade3: '3,5', Specials: '2007,5_2016_2_2023,3_2036,2_2037,5_2039,4_2043,2_2045,4' },
  1220: { id: 1220, cardName: '麒麟', type: 3, subType: 1, exType: 48, number: 5, color: 1, attRange: 5, attDistance: 0, defDistance: 0, spellId: 30, res: 'QiLinGong', Grade1: '10,13', Specials: '2007,5_2011,5_2016_2_2022,5_2036,2_2037,5_2039,4_2043,2_2045,4' },
  1221: { id: 1221, cardName: '乐', type: 2, subType: 5, exType: 48, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 15, cardClass: 'DelayedJinNangCard', res: 'LeBuSiShu', Grade1: '12,14', Grade2: '6,8', Specials: '2016_2_2036,2_2039,4_2045,4' },
  1222: { id: 1222, cardName: '桃', type: 1, subType: 0, exType: 48, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2000,2_2001,2_2002,2_2005,5_2012,2_2016_2_2033,5_2036,2_2039,4_2045,4' },
  1223: { id: 1223, cardName: '桃', type: 1, subType: 0, exType: 48, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2000,2_2001,2_2002,2_2005,5_2012,2_2016_2_2033,5_2036,2_2039,4_2045,4' },
  1224: { id: 1224, cardName: '桃', type: 1, subType: 0, exType: 48, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2000,2_2001,2_2002,2_2005,5_2012,2_2016_2_2036,2_2039,4_2045,4' },
  1225: { id: 1225, cardName: '远交', type: 2, subType: 0, exType: 48, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2021, res: 'YuanJiaoJinGong', Grade1: '15,17', Specials: '2016_2_2021,5_2036,2_2039,4_2045,4' },
  1226: { id: 1226, cardName: '桃', type: 1, subType: 0, exType: 48, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2000,2_2001,2_2002,2_2005,5_2012,2_2016_2_2033,5_2036,2_2039,4_2045,4' },
  1227: { id: 1227, cardName: '杀', type: 1, subType: 0, exType: 48, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, res: 'Sha', Grade1: '23,26', Grade2: '10,12', Grade3: '4,7', Grade4: '1,3', Specials: '2016_2_2017_3_2019,3_2036,2_2039,4_2045,4' },
  1228: { id: 1228, cardName: '桃', type: 1, subType: 0, exType: 48, number: 10, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2000,2_2001,2_2002,2_2005,5_2012,2_2016_2_2033,5_2036,2_2039,4_2045,4' },
  1229: { id: 1229, cardName: '逸劳', type: 2, subType: 0, exType: 48, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2020, res: 'YiYiDaiLao', Grade1: '12,14', Grade2: '6,8', Specials: '2016_2_2021,5_2036,2_2039,4_2045,4' },
  1230: { id: 1230, cardName: '闪', type: 1, subType: 0, exType: 48, number: 11, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2016_2_2019,2_2036,2_2039,4_2045,4_2052,5' },
  1231: { id: 1231, cardName: '杀', type: 1, subType: 0, exType: 48, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, res: 'Sha', Grade1: '23,26', Grade2: '10,12', Grade3: '4,7', Grade4: '1,3', Specials: '2012,3_2016_2_2017_3_2019,3_2028,3_2036,2_2039,4_2040,3_2045,4_2056,3' },
  1232: { id: 1232, cardName: '桃', type: 1, subType: 0, exType: 48, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 3, cardClass: 'TaoNCard', res: 'Tao', Grade1: '23,25', Grade2: '15,20', Grade3: '8,12', Grade4: '4,6', Specials: '2000,2_2001,2_2002,2_2005,5_2012,5_2016_2_2028,3_2033,5_2036,2_2039,4_2040,3_2045,4_2056,3' },
  1233: { id: 1233, cardName: '过拆', type: 2, subType: 0, exType: 48, number: 12, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 5, res: 'GuoHeChaiQiao', Grade1: '12,14', Grade2: '6,8', Grade3: '3,5', Grade4: '1,3', Specials: '2012,3_2016_2_2021,4_2028,3_2036,2_2039,4_2040,3_2045,4_2056,3' },
  1234: { id: 1234, cardName: '闪', type: 1, subType: 0, exType: 48, number: 13, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2012,5_2016_2_2019,2_2028,5_2036,2_2039,4_2040,5_2045,4_2052,5_2056,5' },
  1235: { id: 1235, cardName: '爪黄', type: 3, subType: 3, exType: 48, number: 13, color: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, res: 'Sha', Grade1: '23,26', Grade2: '10,12', Grade3: '4,7', Grade4: '1,3', Specials: '2012,3_2016_2_2017_3_2019,3_2028,3_2035,5_2036,2_2040,3_2045,4_2056,3' },
  1273: { id: 1273, cardName: '三尖', type: 3, subType: 1, exType: 48, number: 12, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 2050, res: 'SanJianLiangRenDao', Grade1: '9,12', Specials: '2007,5_2011,5_2012,3_2016_2_2028,3_2035,5_2036,2_2037,5_2040,3_2043,2_2045,4_2056,3' },
  1274: { id: 1274, cardName: '国无', type: 2, subType: 8, exType: 48, number: 12, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 13, res: 'WuXieKeJiGuo', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7', Specials: '2012,3_2016_2_2021,4_2028,3_2035,5_2036,2_2040,3_2045,4_2056,3' },
  1275: { id: 1275, cardName: '紫骍', type: 3, subType: 4, exType: 48, number: 13, color: 2, attRange: 0, attDistance: 1, defDistance: 0, spellId: 18, res: 'ZiXing', Grade1: '12,14', Grade2: '5,7', Grade3: '3,5', Specials: '2012,5_2016_2_2023,3_2028,5_2035,5_2036,2_2037,5_2040,5_2043,2_2045,4_2056,5' },
  1276: { id: 1276, cardName: '闪', type: 1, subType: 0, exType: 48, number: 13, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4', Specials: '2012,5_2016_2_2019,2_2028,5_2035,5_2036,2_2040,5_2045,4_2052,5_2056,5' },
  1277: { id: 1277, cardName: '水淹', type: 2, subType: 0, exType: 48, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3022, spellId: 6004, imageId: 6004, cardClass: 'JinNangCard', res: 'ShuiYanQiJun2', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5' },
  1278: { id: 1278, cardName: '水淹', type: 2, subType: 0, exType: 48, number: 4, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3022, spellId: 6004, imageId: 6004, cardClass: 'JinNangCard', res: 'ShuiYanQiJun2', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5' },
  1279: { id: 1279, cardName: '冰杀', type: 1, subType: 11, exType: 48, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  1280: { id: 1280, cardName: '杀', type: 1, subType: 0, exType: 48, number: 10, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  1281: { id: 1281, cardName: '杀', type: 1, subType: 0, exType: 48, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  1282: { id: 1282, cardName: '南蛮', type: 2, subType: 0, exType: 48, number: 13, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  1283: { id: 1283, cardName: '逐近', type: 2, subType: 0, exType: 48, number: 3, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3022, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5' },
  1284: { id: 1284, cardName: '冰杀', type: 1, subType: 11, exType: 48, number: 6, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  1285: { id: 1285, cardName: '冰杀', type: 1, subType: 11, exType: 48, number: 7, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  1286: { id: 1286, cardName: '冰杀', type: 1, subType: 11, exType: 48, number: 8, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, cardClass: 'BingShaNCard', res: 'BingSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  1287: { id: 1287, cardName: '无懈', type: 2, subType: 0, exType: 48, number: 11, color: 3, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3021, spellId: 13, imageId: 13, cardClass: 'JinNangCard', res: 'WuXieKeJi', Grade1: '23,25', Grade2: '14,16', Grade3: '7,9', Grade4: '5,7' },
  1288: { id: 1288, cardName: '乌铁', type: 3, subType: 1, exType: 48, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13' },
  1289: { id: 1289, cardName: '火杀', type: 1, subType: 6, exType: 48, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3023, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  1290: { id: 1290, cardName: '洞烛', type: 2, subType: 0, exType: 48, number: 7, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23' },
  1291: { id: 1291, cardName: '洞烛', type: 2, subType: 0, exType: 48, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6003, imageId: 6003, cardClass: 'JinNangCard', res: 'DongZhuXianJi', Grade1: '21,23', Grade2: '21,23', Grade3: '21,23', Grade4: '21,23' },
  1292: { id: 1292, cardName: '出其', type: 2, subType: 0, exType: 48, number: 2, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6000, imageId: 6000, cardClass: 'JinNangCard', res: 'ChuQiBuYi', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5' },
  1293: { id: 1293, cardName: '出其', type: 2, subType: 0, exType: 48, number: 3, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3018, spellId: 6000, imageId: 6000, cardClass: 'JinNangCard', res: 'ChuQiBuYi', Grade1: '10,14', Grade2: '5,8', Grade3: '4,6', Grade4: '3,5' },
  1294: { id: 1294, cardName: '太公', type: 3, subType: 9, exType: 48, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16' },
  1295: { id: 1295, cardName: '藤甲', type: 3, subType: 2, exType: 48, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 88, res: 'TengJia', Grade1: '13,16', Grade2: '6,8', Specials: '2006,3_2007,5_2009,4_2024,4_2031,4_2037,5_2043,2_2052,2' },
  1296: { id: 1296, cardName: '南蛮', type: 2, subType: 0, exType: 48, number: 7, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3016, enhanceEffect: 3020, spellId: 9, imageId: 9, res: 'NanManRuQin', Grade1: '12,14', Grade2: '8,10', Grade3: '4,7', Specials: '7,9_206,-6_21,5_9,7_30,5_32,5_45,7_38,6_46,6_152,6' },
  1297: { id: 1297, cardName: '杀', type: 1, subType: 0, exType: 48, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  1298: { id: 1298, cardName: '杀', type: 1, subType: 0, exType: 48, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3018, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  1299: { id: 1299, cardName: '护心', type: 3, subType: 2, exType: 48, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', Grade1: '11,15' },
  1300: { id: 1300, cardName: '铜雀', type: 3, subType: 9, exType: 48, number: 5, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6013, imageId: 6013, cardClass: 'EquipCard', res: 'TongQue', Grade1: '13,16' },
  1301: { id: 1301, cardName: '逐近', type: 2, subType: 0, exType: 48, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3011, enhanceEffect: 3022, spellId: 6005, imageId: 6005, cardClass: 'JinNangCard', res: 'LangGuZhiJi', Grade1: '12,14', Grade2: '5,9', Grade3: '4,7', Grade4: '3,5' },
  1302: { id: 1302, cardName: '五行', type: 3, subType: 1, exType: 48, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14' },
  1303: { id: 1303, cardName: '闪', type: 1, subType: 0, exType: 48, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4' },
  1304: { id: 1304, cardName: '闪', type: 1, subType: 0, exType: 48, number: 7, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4' },
  1305: { id: 1305, cardName: '闪', type: 1, subType: 0, exType: 48, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4' },
  1306: { id: 1306, cardName: '闪', type: 1, subType: 0, exType: 48, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4' },
  1307: { id: 1307, cardName: '火杀', type: 1, subType: 6, exType: 48, number: 4, color: 1, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3017, enhanceEffect: 3023, spellId: 1, imageId: 1, cardClass: 'HuoShaNCard', res: 'HuoSha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3' },
  20330: { id: 20330, cardName: '不知', type: 1, subType: 0, exType: 48, number: 8, color: 2, attRange: 0, attDistance: 0, defDistance: 0, enhanceCond: 3012, enhanceEffect: 3025, spellId: 2, imageId: 2, res: 'Shan', Grade1: '23,25', Grade2: '12,15', Grade3: '4,6', Grade4: '0,4' }
}

let ZhuGongSha = {
  0: { color: '', cardName: '?', number: '', type: '' },
  1: { color: '2', cardName: '决斗', number: 1, type: '2' },
  2: { color: '2', cardName: '闪', number: 2, type: '1' },
  3: { color: '2', cardName: '顺手', number: 3, type: '2' },
  4: { color: '2', cardName: '顺手', number: 4, type: '2' },
  5: { color: '2', cardName: '贯石', number: 5, type: '3' },
  6: { color: '2', cardName: '杀', number: 6, type: '1' },
  7: { color: '2', cardName: '杀', number: 7, type: '1' },
  8: { color: '2', cardName: '杀', number: 8, type: '1' },
  9: { color: '2', cardName: '杀', number: 9, type: '1' },
  10: { color: '2', cardName: '杀', number: 10, type: '1' },
  11: { color: '2', cardName: '闪', number: 11, type: '1' },
  12: { color: '2', cardName: '方天', number: 12, type: '3' },
  13: { color: '2', cardName: '紫骍', number: 13, type: '3' },
  14: { color: '2', cardName: '连弩', number: 1, type: '3' },
  17: { color: '2', cardName: '闪', number: 4, type: '1' },
  18: { color: '2', cardName: '闪', number: 5, type: '1' },
  19: { color: '2', cardName: '闪', number: 6, type: '1' },
  20: { color: '2', cardName: '闪', number: 7, type: '1' },
  21: { color: '2', cardName: '闪', number: 8, type: '1' },
  22: { color: '2', cardName: '闪', number: 9, type: '1' },
  23: { color: '2', cardName: '闪', number: 10, type: '1' },
  24: { color: '2', cardName: '闪', number: 11, type: '1' },
  25: { color: '2', cardName: '桃', number: 12, type: '1' },
  26: { color: '2', cardName: '杀', number: 13, type: '1' },
  27: { color: '1', cardName: '万箭', number: 1, type: '2' },
  28: { color: '1', cardName: '闪', number: 2, type: '1' },
  29: { color: '1', cardName: '五谷', number: 3, type: '2' },
  30: { color: '1', cardName: '五谷', number: 4, type: '2' },
  31: { color: '1', cardName: '赤兔', number: 5, type: '3' },
  33: { color: '1', cardName: '无中', number: 7, type: '2' },
  34: { color: '1', cardName: '无中', number: 8, type: '2' },
  35: { color: '1', cardName: '无中', number: 9, type: '2' },
  36: { color: '1', cardName: '杀', number: 10, type: '1' },
  37: { color: '1', cardName: '无中', number: 11, type: '2' },
  38: { color: '1', cardName: '过拆', number: 12, type: '2' },
  39: { color: '1', cardName: '闪', number: 13, type: '1' },
  40: { color: '1', cardName: '桃园', number: 1, type: '2' },
  41: { color: '1', cardName: '闪', number: 2, type: '1' },
  42: { color: '1', cardName: '桃', number: 3, type: '1' },
  43: { color: '1', cardName: '桃', number: 4, type: '1' },
  44: { color: '1', cardName: '麒麟', number: 5, type: '3' },
  45: { color: '1', cardName: '桃', number: 6, type: '1' },
  46: { color: '1', cardName: '桃', number: 7, type: '1' },
  47: { color: '1', cardName: '桃', number: 8, type: '1' },
  48: { color: '1', cardName: '桃', number: 9, type: '1' },
  49: { color: '1', cardName: '杀', number: 10, type: '1' },
  50: { color: '1', cardName: '杀', number: 11, type: '1' },
  51: { color: '1', cardName: '桃', number: 12, type: '1' },
  52: { color: '1', cardName: '爪黄', number: 13, type: '3' },
  53: { color: '4', cardName: '决斗', number: 1, type: '2' },
  54: { color: '4', cardName: '杀', number: 2, type: '1' },
  55: { color: '4', cardName: '杀', number: 3, type: '1' },
  56: { color: '4', cardName: '杀', number: 4, type: '1' },
  57: { color: '4', cardName: '杀', number: 5, type: '1' },
  58: { color: '4', cardName: '杀', number: 6, type: '1' },
  59: { color: '4', cardName: '杀', number: 7, type: '1' },
  60: { color: '4', cardName: '杀', number: 8, type: '1' },
  61: { color: '4', cardName: '杀', number: 9, type: '1' },
  62: { color: '4', cardName: '杀', number: 10, type: '1' },
  63: { color: '4', cardName: '杀', number: 11, type: '1' },
  64: { color: '4', cardName: '无懈', number: 12, type: '2' },
  65: { color: '4', cardName: '无懈', number: 13, type: '2' },
  66: { color: '4', cardName: '连弩', number: 1, type: '3' },
  67: { color: '4', cardName: '八卦', number: 2, type: '3' },
  68: { color: '4', cardName: '过拆', number: 3, type: '2' },
  69: { color: '4', cardName: '过拆', number: 4, type: '2' },
  70: { color: '4', cardName: '的卢', number: 5, type: '3' },
  72: { color: '4', cardName: '南蛮', number: 7, type: '2' },
  73: { color: '4', cardName: '杀', number: 8, type: '1' },
  74: { color: '4', cardName: '杀', number: 9, type: '1' },
  75: { color: '4', cardName: '杀', number: 10, type: '1' },
  76: { color: '4', cardName: '杀', number: 11, type: '1' },
  77: { color: '4', cardName: '借刀', number: 12, type: '2' },
  78: { color: '4', cardName: '借刀', number: 13, type: '2' },
  79: { color: '3', cardName: '决斗', number: 1, type: '2' },
  80: { color: '3', cardName: '雌雄', number: 2, type: '3' },
  81: { color: '3', cardName: '顺手', number: 3, type: '2' },
  82: { color: '3', cardName: '顺手', number: 4, type: '2' },
  83: { color: '3', cardName: '绝影', number: 5, type: '3' },
  84: { color: '3', cardName: '青釭', number: 6, type: '3' },
  85: { color: '3', cardName: '杀', number: 7, type: '1' },
  86: { color: '3', cardName: '杀', number: 8, type: '1' },
  87: { color: '3', cardName: '杀', number: 9, type: '1' },
  88: { color: '3', cardName: '杀', number: 10, type: '1' },
  89: { color: '3', cardName: '顺手', number: 11, type: '2' },
  90: { color: '3', cardName: '过拆', number: 12, type: '2' },
  91: { color: '3', cardName: '南蛮', number: 13, type: '2' },
  92: { color: '3', cardName: '闪电', number: 1, type: '2' },
  93: { color: '3', cardName: '八卦', number: 2, type: '3' },
  94: { color: '3', cardName: '过拆', number: 3, type: '2' },
  95: { color: '3', cardName: '过拆', number: 4, type: '2' },
  96: { color: '3', cardName: '青龙', number: 5, type: '3' },
  97: { color: '3', cardName: '乐', number: 6, type: '2' },
  98: { color: '3', cardName: '南蛮', number: 7, type: '2' },
  99: { color: '3', cardName: '杀', number: 8, type: '1' },
  100: { color: '3', cardName: '杀', number: 9, type: '1' },
  101: { color: '3', cardName: '杀', number: 10, type: '1' },
  102: { color: '3', cardName: '无懈', number: 11, type: '2' },
  103: { color: '3', cardName: '丈八', number: 12, type: '3' },
  104: { color: '3', cardName: '大宛', number: 13, type: '3' },
  105: { color: '1', cardName: '闪电', number: 12, type: '2' },
  106: { color: '2', cardName: '无懈', number: 12, type: '2' },
  107: { color: '4', cardName: '仁王', number: 2, type: '3' },
  108: { color: '3', cardName: '寒冰', number: 2, type: '3' },
  109: { color: '1', cardName: '无懈', number: 1, type: '2' },
  110: { color: '1', cardName: '火攻', number: 2, type: '2' },
  111: { color: '1', cardName: '火攻', number: 3, type: '2' },
  112: { color: '1', cardName: '火杀', number: 4, type: '1' },
  115: { color: '1', cardName: '火杀', number: 7, type: '1' },
  118: { color: '1', cardName: '火杀', number: 10, type: '1' },
  119: { color: '1', cardName: '闪', number: 11, type: '1' },
  120: { color: '1', cardName: '闪', number: 12, type: '1' },
  121: { color: '1', cardName: '无懈', number: 13, type: '2' },
  122: { color: '2', cardName: '朱雀', number: 1, type: '3' },
  123: { color: '2', cardName: '桃', number: 2, type: '1' },
  124: { color: '2', cardName: '桃', number: 3, type: '1' },
  125: { color: '2', cardName: '火杀', number: 4, type: '1' },
  126: { color: '2', cardName: '火杀', number: 5, type: '1' },
  127: { color: '2', cardName: '闪', number: 6, type: '1' },
  128: { color: '2', cardName: '闪', number: 7, type: '1' },
  129: { color: '2', cardName: '闪', number: 8, type: '1' },
  130: { color: '2', cardName: '酒', number: 9, type: '1' },
  131: { color: '2', cardName: '闪', number: 10, type: '1' },
  132: { color: '2', cardName: '闪', number: 11, type: '1' },
  133: { color: '2', cardName: '火攻', number: 12, type: '2' },
  134: { color: '2', cardName: '骅骝', number: 13, type: '3' },
  135: { color: '3', cardName: '古锭', number: 1, type: '3' },
  136: { color: '3', cardName: '藤甲', number: 2, type: '3' },
  137: { color: '3', cardName: '酒', number: 3, type: '1' },
  138: { color: '3', cardName: '雷杀', number: 4, type: '1' },
  139: { color: '3', cardName: '雷杀', number: 5, type: '1' },
  140: { color: '3', cardName: '雷杀', number: 6, type: '1' },
  141: { color: '3', cardName: '雷杀', number: 7, type: '1' },
  142: { color: '3', cardName: '雷杀', number: 8, type: '1' },
  143: { color: '3', cardName: '酒', number: 9, type: '1' },
  145: { color: '3', cardName: '铁索', number: 11, type: '2' },
  146: { color: '3', cardName: '铁索', number: 12, type: '2' },
  147: { color: '3', cardName: '无懈', number: 13, type: '2' },
  148: { color: '4', cardName: '白银', number: 1, type: '3' },
  149: { color: '4', cardName: '藤甲', number: 2, type: '3' },
  150: { color: '4', cardName: '酒', number: 3, type: '1' },
  151: { color: '4', cardName: '兵', number: 4, type: '2' },
  152: { color: '4', cardName: '雷杀', number: 5, type: '1' },
  153: { color: '4', cardName: '雷杀', number: 6, type: '1' },
  154: { color: '4', cardName: '雷杀', number: 7, type: '1' },
  155: { color: '4', cardName: '雷杀', number: 8, type: '1' },
  156: { color: '4', cardName: '酒', number: 9, type: '1' },
  157: { color: '4', cardName: '铁索', number: 10, type: '2' },
  158: { color: '4', cardName: '铁索', number: 11, type: '2' },
  159: { color: '4', cardName: '铁索', number: 12, type: '2' },
  160: { color: '4', cardName: '铁索', number: 13, type: '2' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' },
  13000: { id: 13000, cardName: '杀', type: 1, subType: 0, exType: 0, number: 5, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13001: { id: 13001, cardName: '杀', type: 1, subType: 0, exType: 0, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13002: { id: 13002, cardName: '杀', type: 1, subType: 0, exType: 0, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13003: { id: 13003, cardName: '杀', type: 1, subType: 0, exType: 0, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13004: { id: 13004, cardName: '酒', type: 1, subType: 0, exType: 0, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2,4_106,4_22,6_20,6_13,8_11,5' },
  13005: { id: 13005, cardName: '酒', type: 1, subType: 0, exType: 0, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2,4_106,4_22,6_20,6_13,8_11,5' }
}

let ZhuGongShaShanShan = {
  0: { color: '', cardName: '?', number: '', type: '' },
  1: { color: '2', cardName: '决斗', number: 1, type: '2' },
  2: { color: '2', cardName: '闪', number: 2, type: '1' },
  3: { color: '2', cardName: '顺手', number: 3, type: '2' },
  4: { color: '2', cardName: '顺手', number: 4, type: '2' },
  5: { color: '2', cardName: '贯石', number: 5, type: '3' },
  6: { color: '2', cardName: '杀', number: 6, type: '1' },
  7: { color: '2', cardName: '杀', number: 7, type: '1' },
  8: { color: '2', cardName: '杀', number: 8, type: '1' },
  9: { color: '2', cardName: '杀', number: 9, type: '1' },
  10: { color: '2', cardName: '杀', number: 10, type: '1' },
  11: { color: '2', cardName: '闪', number: 11, type: '1' },
  12: { color: '2', cardName: '方天', number: 12, type: '3' },
  13: { color: '2', cardName: '紫骍', number: 13, type: '3' },
  14: { color: '2', cardName: '连弩', number: 1, type: '3' },
  17: { color: '2', cardName: '闪', number: 4, type: '1' },
  18: { color: '2', cardName: '闪', number: 5, type: '1' },
  19: { color: '2', cardName: '闪', number: 6, type: '1' },
  20: { color: '2', cardName: '闪', number: 7, type: '1' },
  21: { color: '2', cardName: '闪', number: 8, type: '1' },
  22: { color: '2', cardName: '闪', number: 9, type: '1' },
  23: { color: '2', cardName: '闪', number: 10, type: '1' },
  24: { color: '2', cardName: '闪', number: 11, type: '1' },
  25: { color: '2', cardName: '桃', number: 12, type: '1' },
  26: { color: '2', cardName: '杀', number: 13, type: '1' },
  27: { color: '1', cardName: '万箭', number: 1, type: '2' },
  28: { color: '1', cardName: '闪', number: 2, type: '1' },
  29: { color: '1', cardName: '五谷', number: 3, type: '2' },
  30: { color: '1', cardName: '五谷', number: 4, type: '2' },
  31: { color: '1', cardName: '赤兔', number: 5, type: '3' },
  33: { color: '1', cardName: '无中', number: 7, type: '2' },
  34: { color: '1', cardName: '无中', number: 8, type: '2' },
  35: { color: '1', cardName: '无中', number: 9, type: '2' },
  36: { color: '1', cardName: '杀', number: 10, type: '1' },
  37: { color: '1', cardName: '无中', number: 11, type: '2' },
  38: { color: '1', cardName: '过拆', number: 12, type: '2' },
  39: { color: '1', cardName: '闪', number: 13, type: '1' },
  40: { color: '1', cardName: '桃园', number: 1, type: '2' },
  41: { color: '1', cardName: '闪', number: 2, type: '1' },
  42: { color: '1', cardName: '桃', number: 3, type: '1' },
  43: { color: '1', cardName: '桃', number: 4, type: '1' },
  44: { color: '1', cardName: '麒麟', number: 5, type: '3' },
  45: { color: '1', cardName: '桃', number: 6, type: '1' },
  46: { color: '1', cardName: '桃', number: 7, type: '1' },
  47: { color: '1', cardName: '桃', number: 8, type: '1' },
  48: { color: '1', cardName: '桃', number: 9, type: '1' },
  49: { color: '1', cardName: '杀', number: 10, type: '1' },
  50: { color: '1', cardName: '杀', number: 11, type: '1' },
  51: { color: '1', cardName: '桃', number: 12, type: '1' },
  52: { color: '1', cardName: '爪黄', number: 13, type: '3' },
  53: { color: '4', cardName: '决斗', number: 1, type: '2' },
  54: { color: '4', cardName: '杀', number: 2, type: '1' },
  55: { color: '4', cardName: '杀', number: 3, type: '1' },
  56: { color: '4', cardName: '杀', number: 4, type: '1' },
  57: { color: '4', cardName: '杀', number: 5, type: '1' },
  58: { color: '4', cardName: '杀', number: 6, type: '1' },
  59: { color: '4', cardName: '杀', number: 7, type: '1' },
  60: { color: '4', cardName: '杀', number: 8, type: '1' },
  61: { color: '4', cardName: '杀', number: 9, type: '1' },
  62: { color: '4', cardName: '杀', number: 10, type: '1' },
  63: { color: '4', cardName: '杀', number: 11, type: '1' },
  64: { color: '4', cardName: '无懈', number: 12, type: '2' },
  65: { color: '4', cardName: '无懈', number: 13, type: '2' },
  66: { color: '4', cardName: '连弩', number: 1, type: '3' },
  67: { color: '4', cardName: '八卦', number: 2, type: '3' },
  68: { color: '4', cardName: '过拆', number: 3, type: '2' },
  69: { color: '4', cardName: '过拆', number: 4, type: '2' },
  70: { color: '4', cardName: '的卢', number: 5, type: '3' },
  72: { color: '4', cardName: '南蛮', number: 7, type: '2' },
  73: { color: '4', cardName: '杀', number: 8, type: '1' },
  74: { color: '4', cardName: '杀', number: 9, type: '1' },
  75: { color: '4', cardName: '杀', number: 10, type: '1' },
  76: { color: '4', cardName: '杀', number: 11, type: '1' },
  77: { color: '4', cardName: '借刀', number: 12, type: '2' },
  78: { color: '4', cardName: '借刀', number: 13, type: '2' },
  79: { color: '3', cardName: '决斗', number: 1, type: '2' },
  80: { color: '3', cardName: '雌雄', number: 2, type: '3' },
  81: { color: '3', cardName: '顺手', number: 3, type: '2' },
  82: { color: '3', cardName: '顺手', number: 4, type: '2' },
  83: { color: '3', cardName: '绝影', number: 5, type: '3' },
  84: { color: '3', cardName: '青釭', number: 6, type: '3' },
  85: { color: '3', cardName: '杀', number: 7, type: '1' },
  86: { color: '3', cardName: '杀', number: 8, type: '1' },
  87: { color: '3', cardName: '杀', number: 9, type: '1' },
  88: { color: '3', cardName: '杀', number: 10, type: '1' },
  89: { color: '3', cardName: '顺手', number: 11, type: '2' },
  90: { color: '3', cardName: '过拆', number: 12, type: '2' },
  91: { color: '3', cardName: '南蛮', number: 13, type: '2' },
  92: { color: '3', cardName: '闪电', number: 1, type: '2' },
  93: { color: '3', cardName: '八卦', number: 2, type: '3' },
  94: { color: '3', cardName: '过拆', number: 3, type: '2' },
  95: { color: '3', cardName: '过拆', number: 4, type: '2' },
  96: { color: '3', cardName: '青龙', number: 5, type: '3' },
  97: { color: '3', cardName: '乐', number: 6, type: '2' },
  98: { color: '3', cardName: '南蛮', number: 7, type: '2' },
  99: { color: '3', cardName: '杀', number: 8, type: '1' },
  100: { color: '3', cardName: '杀', number: 9, type: '1' },
  101: { color: '3', cardName: '杀', number: 10, type: '1' },
  102: { color: '3', cardName: '无懈', number: 11, type: '2' },
  103: { color: '3', cardName: '丈八', number: 12, type: '3' },
  104: { color: '3', cardName: '大宛', number: 13, type: '3' },
  105: { color: '1', cardName: '闪电', number: 12, type: '2' },
  106: { color: '2', cardName: '无懈', number: 12, type: '2' },
  107: { color: '4', cardName: '仁王', number: 2, type: '3' },
  108: { color: '3', cardName: '寒冰', number: 2, type: '3' },
  109: { color: '1', cardName: '无懈', number: 1, type: '2' },
  110: { color: '1', cardName: '火攻', number: 2, type: '2' },
  111: { color: '1', cardName: '火攻', number: 3, type: '2' },
  112: { color: '1', cardName: '火杀', number: 4, type: '1' },
  115: { color: '1', cardName: '火杀', number: 7, type: '1' },
  118: { color: '1', cardName: '火杀', number: 10, type: '1' },
  119: { color: '1', cardName: '闪', number: 11, type: '1' },
  120: { color: '1', cardName: '闪', number: 12, type: '1' },
  121: { color: '1', cardName: '无懈', number: 13, type: '2' },
  122: { color: '2', cardName: '朱雀', number: 1, type: '3' },
  123: { color: '2', cardName: '桃', number: 2, type: '1' },
  124: { color: '2', cardName: '桃', number: 3, type: '1' },
  125: { color: '2', cardName: '火杀', number: 4, type: '1' },
  126: { color: '2', cardName: '火杀', number: 5, type: '1' },
  127: { color: '2', cardName: '闪', number: 6, type: '1' },
  128: { color: '2', cardName: '闪', number: 7, type: '1' },
  129: { color: '2', cardName: '闪', number: 8, type: '1' },
  130: { color: '2', cardName: '酒', number: 9, type: '1' },
  131: { color: '2', cardName: '闪', number: 10, type: '1' },
  132: { color: '2', cardName: '闪', number: 11, type: '1' },
  133: { color: '2', cardName: '火攻', number: 12, type: '2' },
  134: { color: '2', cardName: '骅骝', number: 13, type: '3' },
  135: { color: '3', cardName: '古锭', number: 1, type: '3' },
  136: { color: '3', cardName: '藤甲', number: 2, type: '3' },
  137: { color: '3', cardName: '酒', number: 3, type: '1' },
  138: { color: '3', cardName: '雷杀', number: 4, type: '1' },
  139: { color: '3', cardName: '雷杀', number: 5, type: '1' },
  140: { color: '3', cardName: '雷杀', number: 6, type: '1' },
  141: { color: '3', cardName: '雷杀', number: 7, type: '1' },
  142: { color: '3', cardName: '雷杀', number: 8, type: '1' },
  143: { color: '3', cardName: '酒', number: 9, type: '1' },
  145: { color: '3', cardName: '铁索', number: 11, type: '2' },
  146: { color: '3', cardName: '铁索', number: 12, type: '2' },
  147: { color: '3', cardName: '无懈', number: 13, type: '2' },
  148: { color: '4', cardName: '白银', number: 1, type: '3' },
  149: { color: '4', cardName: '藤甲', number: 2, type: '3' },
  150: { color: '4', cardName: '酒', number: 3, type: '1' },
  151: { color: '4', cardName: '兵', number: 4, type: '2' },
  152: { color: '4', cardName: '雷杀', number: 5, type: '1' },
  153: { color: '4', cardName: '雷杀', number: 6, type: '1' },
  154: { color: '4', cardName: '雷杀', number: 7, type: '1' },
  155: { color: '4', cardName: '雷杀', number: 8, type: '1' },
  156: { color: '4', cardName: '酒', number: 9, type: '1' },
  157: { color: '4', cardName: '铁索', number: 10, type: '2' },
  158: { color: '4', cardName: '铁索', number: 11, type: '2' },
  159: { color: '4', cardName: '铁索', number: 12, type: '2' },
  160: { color: '4', cardName: '铁索', number: 13, type: '2' },
  12140: { color: '2', cardName: '闪', number: 3, type: '2' },
  12141: { color: '2', cardName: '闪', number: 5, type: '2' },
  12142: { color: '2', cardName: '闪', number: 6, type: '2' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' },
  13000: { id: 13000, cardName: '杀', type: 1, subType: 0, exType: 0, number: 5, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13001: { id: 13001, cardName: '杀', type: 1, subType: 0, exType: 0, number: 6, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13002: { id: 13002, cardName: '杀', type: 1, subType: 0, exType: 0, number: 8, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13003: { id: 13003, cardName: '杀', type: 1, subType: 0, exType: 0, number: 9, color: 1, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13004: { id: 13004, cardName: '酒', type: 1, subType: 0, exType: 0, number: 2, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2,4_106,4_22,6_20,6_13,8_11,5' },
  13005: { id: 13005, cardName: '酒', type: 1, subType: 0, exType: 0, number: 3, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2,4_106,4_22,6_20,6_13,8_11,5' }
}

let puyuan = {
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' }
}

let DouDiZhu = {
  0: { color: '', cardName: '?', number: '', type: '' },
  1: { color: '2', cardName: '决斗', number: 1, type: '2' },
  2: { color: '2', cardName: '闪', number: 2, type: '1' },
  3: { color: '2', cardName: '顺手', number: 3, type: '2' },
  4: { color: '2', cardName: '顺手', number: 4, type: '2' },
  5: { color: '2', cardName: '贯石', number: 5, type: '3' },
  6: { color: '2', cardName: '杀', number: 6, type: '1' },
  7: { color: '2', cardName: '杀', number: 7, type: '1' },
  8: { color: '2', cardName: '杀', number: 8, type: '1' },
  9: { color: '2', cardName: '杀', number: 9, type: '1' },
  10: { color: '2', cardName: '杀', number: 10, type: '1' },
  11: { color: '2', cardName: '闪', number: 11, type: '1' },
  12: { color: '2', cardName: '方天', number: 12, type: '3' },
  13: { color: '2', cardName: '紫骍', number: 13, type: '3' },
  14: { color: '2', cardName: '连弩', number: 1, type: '3' },
  15: { color: '2', cardName: '闪', number: 2, type: '1' },
  16: { color: '2', cardName: '闪', number: 3, type: '1' },
  17: { color: '2', cardName: '闪', number: 4, type: '1' },
  18: { color: '2', cardName: '闪', number: 5, type: '1' },
  19: { color: '2', cardName: '闪', number: 6, type: '1' },
  20: { color: '2', cardName: '闪', number: 7, type: '1' },
  21: { color: '2', cardName: '闪', number: 8, type: '1' },
  22: { color: '2', cardName: '闪', number: 9, type: '1' },
  23: { color: '2', cardName: '闪', number: 10, type: '1' },
  24: { color: '2', cardName: '闪', number: 11, type: '1' },
  25: { color: '2', cardName: '桃', number: 12, type: '1' },
  26: { color: '2', cardName: '杀', number: 13, type: '1' },
  27: { color: '1', cardName: '万箭', number: 1, type: '2' },
  28: { color: '1', cardName: '闪', number: 2, type: '1' },
  29: { color: '1', cardName: '五谷', number: 3, type: '2' },
  30: { color: '1', cardName: '五谷', number: 4, type: '2' },
  31: { color: '1', cardName: '赤兔', number: 5, type: '3' },
  32: { color: '1', cardName: '乐', number: 6, type: '2' },
  33: { color: '1', cardName: '无中', number: 7, type: '2' },
  34: { color: '1', cardName: '无中', number: 8, type: '2' },
  35: { color: '1', cardName: '无中', number: 9, type: '2' },
  36: { color: '1', cardName: '杀', number: 10, type: '1' },
  37: { color: '1', cardName: '无中', number: 11, type: '2' },
  38: { color: '1', cardName: '过拆', number: 12, type: '2' },
  39: { color: '1', cardName: '闪', number: 13, type: '1' },
  40: { color: '1', cardName: '桃园', number: 1, type: '2' },
  41: { color: '1', cardName: '闪', number: 2, type: '1' },
  42: { color: '1', cardName: '桃', number: 3, type: '1' },
  43: { color: '1', cardName: '桃', number: 4, type: '1' },
  44: { color: '1', cardName: '麒麟', number: 5, type: '3' },
  45: { color: '1', cardName: '桃', number: 6, type: '1' },
  46: { color: '1', cardName: '桃', number: 7, type: '1' },
  47: { color: '1', cardName: '桃', number: 8, type: '1' },
  48: { color: '1', cardName: '桃', number: 9, type: '1' },
  49: { color: '1', cardName: '杀', number: 10, type: '1' },
  50: { color: '1', cardName: '杀', number: 11, type: '1' },
  51: { color: '1', cardName: '桃', number: 12, type: '1' },
  52: { color: '1', cardName: '爪黄', number: 13, type: '3' },
  53: { color: '4', cardName: '决斗', number: 1, type: '2' },
  54: { color: '4', cardName: '杀', number: 2, type: '1' },
  55: { color: '4', cardName: '杀', number: 3, type: '1' },
  56: { color: '4', cardName: '杀', number: 4, type: '1' },
  57: { color: '4', cardName: '杀', number: 5, type: '1' },
  58: { color: '4', cardName: '杀', number: 6, type: '1' },
  59: { color: '4', cardName: '杀', number: 7, type: '1' },
  60: { color: '4', cardName: '杀', number: 8, type: '1' },
  61: { color: '4', cardName: '杀', number: 9, type: '1' },
  62: { color: '4', cardName: '杀', number: 10, type: '1' },
  63: { color: '4', cardName: '杀', number: 11, type: '1' },
  64: { color: '4', cardName: '无懈', number: 12, type: '2' },
  65: { color: '4', cardName: '无懈', number: 13, type: '2' },
  66: { color: '4', cardName: '连弩', number: 1, type: '3' },
  67: { color: '4', cardName: '八卦', number: 2, type: '3' },
  68: { color: '4', cardName: '过拆', number: 3, type: '2' },
  69: { color: '4', cardName: '过拆', number: 4, type: '2' },
  70: { color: '4', cardName: '的卢', number: 5, type: '3' },
  71: { color: '4', cardName: '乐', number: 6, type: '2' },
  72: { color: '4', cardName: '南蛮', number: 7, type: '2' },
  73: { color: '4', cardName: '杀', number: 8, type: '1' },
  74: { color: '4', cardName: '杀', number: 9, type: '1' },
  75: { color: '4', cardName: '杀', number: 10, type: '1' },
  76: { color: '4', cardName: '杀', number: 11, type: '1' },
  77: { color: '4', cardName: '借刀', number: 12, type: '2' },
  78: { color: '4', cardName: '借刀', number: 13, type: '2' },
  79: { color: '3', cardName: '决斗', number: 1, type: '2' },
  80: { color: '3', cardName: '雌雄', number: 2, type: '3' },
  81: { color: '3', cardName: '顺手', number: 3, type: '2' },
  82: { color: '3', cardName: '顺手', number: 4, type: '2' },
  83: { color: '3', cardName: '绝影', number: 5, type: '3' },
  84: { color: '3', cardName: '青釭', number: 6, type: '3' },
  85: { color: '3', cardName: '杀', number: 7, type: '1' },
  86: { color: '3', cardName: '杀', number: 8, type: '1' },
  87: { color: '3', cardName: '杀', number: 9, type: '1' },
  88: { color: '3', cardName: '杀', number: 10, type: '1' },
  89: { color: '3', cardName: '顺手', number: 11, type: '2' },
  90: { color: '3', cardName: '过拆', number: 12, type: '2' },
  91: { color: '3', cardName: '南蛮', number: 13, type: '2' },
  92: { color: '3', cardName: '闪电', number: 1, type: '2' },
  93: { color: '3', cardName: '八卦', number: 2, type: '3' },
  94: { color: '3', cardName: '过拆', number: 3, type: '2' },
  95: { color: '3', cardName: '过拆', number: 4, type: '2' },
  96: { color: '3', cardName: '青龙', number: 5, type: '3' },
  97: { color: '3', cardName: '乐', number: 6, type: '2' },
  98: { color: '3', cardName: '南蛮', number: 7, type: '2' },
  99: { color: '3', cardName: '杀', number: 8, type: '1' },
  100: { color: '3', cardName: '杀', number: 9, type: '1' },
  101: { color: '3', cardName: '杀', number: 10, type: '1' },
  102: { color: '3', cardName: '无懈', number: 11, type: '2' },
  103: { color: '3', cardName: '丈八', number: 12, type: '3' },
  104: { color: '3', cardName: '大宛', number: 13, type: '3' },
  105: { color: '1', cardName: '闪电', number: 12, type: '2' },
  106: { color: '2', cardName: '无懈', number: 12, type: '2' },
  107: { color: '4', cardName: '仁王', number: 2, type: '3' },
  108: { color: '3', cardName: '寒冰', number: 2, type: '3' },
  109: { color: '1', cardName: '无懈', number: 1, type: '2' },
  110: { color: '1', cardName: '火攻', number: 2, type: '2' },
  111: { color: '1', cardName: '火攻', number: 3, type: '2' },
  112: { color: '1', cardName: '火杀', number: 4, type: '1' },
  113: { color: '1', cardName: '桃', number: 5, type: '1' },
  114: { color: '1', cardName: '桃', number: 6, type: '1' },
  115: { color: '1', cardName: '火杀', number: 7, type: '1' },
  116: { color: '1', cardName: '闪', number: 8, type: '1' },
  117: { color: '1', cardName: '闪', number: 9, type: '1' },
  118: { color: '1', cardName: '火杀', number: 10, type: '1' },
  119: { color: '1', cardName: '闪', number: 11, type: '1' },
  120: { color: '1', cardName: '闪', number: 12, type: '1' },
  121: { color: '1', cardName: '无懈', number: 13, type: '2' },
  122: { color: '2', cardName: '朱雀', number: 1, type: '3' },
  123: { color: '2', cardName: '桃', number: 2, type: '1' },
  124: { color: '2', cardName: '桃', number: 3, type: '1' },
  125: { color: '2', cardName: '火杀', number: 4, type: '1' },
  126: { color: '2', cardName: '火杀', number: 5, type: '1' },
  127: { color: '2', cardName: '闪', number: 6, type: '1' },
  128: { color: '2', cardName: '闪', number: 7, type: '1' },
  129: { color: '2', cardName: '闪', number: 8, type: '1' },
  130: { color: '2', cardName: '酒', number: 9, type: '1' },
  131: { color: '2', cardName: '闪', number: 10, type: '1' },
  132: { color: '2', cardName: '闪', number: 11, type: '1' },
  133: { color: '2', cardName: '火攻', number: 12, type: '2' },
  134: { color: '2', cardName: '骅骝', number: 13, type: '3' },
  135: { color: '3', cardName: '古锭', number: 1, type: '3' },
  136: { color: '3', cardName: '藤甲', number: 2, type: '3' },
  137: { color: '3', cardName: '酒', number: 3, type: '1' },
  138: { color: '3', cardName: '雷杀', number: 4, type: '1' },
  139: { color: '3', cardName: '雷杀', number: 5, type: '1' },
  140: { color: '3', cardName: '雷杀', number: 6, type: '1' },
  141: { color: '3', cardName: '雷杀', number: 7, type: '1' },
  142: { color: '3', cardName: '雷杀', number: 8, type: '1' },
  143: { color: '3', cardName: '酒', number: 9, type: '1' },
  144: { color: '3', cardName: '兵', number: 10, type: '2' },
  145: { color: '3', cardName: '铁索', number: 11, type: '2' },
  146: { color: '3', cardName: '铁索', number: 12, type: '2' },
  147: { color: '3', cardName: '无懈', number: 13, type: '2' },
  148: { color: '4', cardName: '白银', number: 1, type: '3' },
  149: { color: '4', cardName: '藤甲', number: 2, type: '3' },
  150: { color: '4', cardName: '酒', number: 3, type: '1' },
  151: { color: '4', cardName: '兵', number: 4, type: '2' },
  152: { color: '4', cardName: '雷杀', number: 5, type: '1' },
  153: { color: '4', cardName: '雷杀', number: 6, type: '1' },
  154: { color: '4', cardName: '雷杀', number: 7, type: '1' },
  155: { color: '4', cardName: '雷杀', number: 8, type: '1' },
  156: { color: '4', cardName: '酒', number: 9, type: '1' },
  157: { color: '4', cardName: '铁索', number: 10, type: '2' },
  158: { color: '4', cardName: '铁索', number: 11, type: '2' },
  159: { color: '4', cardName: '铁索', number: 12, type: '2' },
  160: { color: '4', cardName: '铁索', number: 13, type: '2' },
  13000: { id: 13000, cardName: '杀', type: '1', subType: 0, exType: 0, number: 5, color: '1', attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13001: { id: 13001, cardName: '杀', type: '1', subType: 0, exType: 0, number: 6, color: '1', attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13002: { id: 13002, cardName: '杀', type: '1', subType: 0, exType: 0, number: 8, color: '1', attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13003: { id: 13003, cardName: '杀', type: '1', subType: 0, exType: 0, number: 9, color: '1', attRange: 0, attDistance: 0, defDistance: 0, spellId: 1, imageId: 1, res: 'Sha', Grade1: '23,25', Grade2: '8,12', Grade3: '4,7', Grade4: '1,3', Specials: '22,6_3,7_105,5_39,5_26,5_6,5_107,5_153,5_158,5_152,5_23,5_19,5_5,3_13,8_54,6' },
  13004: { id: 13004, cardName: '酒', type: '1', subType: 0, exType: 0, number: 2, color: '2', attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2,4_106,4_22,6_20,6_13,8_11,5' },
  13005: { id: 13005, cardName: '酒', type: '1', subType: 0, exType: 0, number: 3, color: '2', attRange: 0, attDistance: 0, defDistance: 0, spellId: 82, res: 'Jiu', Grade1: '15,18', Grade2: '10,14', Grade3: '6,9', Grade4: '2,4', Specials: '2,4_106,4_22,6_20,6_13,8_11,5' },
  12110: { id: 12110, cardName: '无双', type: 3, subType: 1, exType: 0, number: 12, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 388, imageId: 388, cardClass: 'EquipCard', res: 'WuShuangFangTianJi', recycle: '0;0;1,2,4,7' },
  12111: { id: 12111, cardName: '鬼龙', type: 3, subType: 1, exType: 0, number: 5, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 1128, imageId: 1128, cardClass: 'EquipCard', res: 'GuiLongZhanYueDao', recycle: '0;0;1,2,4,7' },
  12112: { id: 12112, cardName: '赤血', type: 3, subType: 1, exType: 0, number: 6, color: 3, attRange: 2, attDistance: 0, defDistance: 0, spellId: 1135, imageId: 1135, cardClass: 'EquipCard', res: 'ChiXueQingFeng', recycle: '0;0;1,2,4,7' },
  12113: { id: 12113, cardName: '镔铁', type: 3, subType: 1, exType: 0, number: 13, color: 2, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6008, imageId: 6008, cardClass: 'EquipCard', res: 'BinTieShuangJi', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12114: { id: 12114, cardName: '乌铁', type: 3, subType: 1, exType: 0, number: 13, color: 3, attRange: 3, attDistance: 0, defDistance: 0, spellId: 6010, imageId: 6010, cardClass: 'EquipCard', res: 'LiuXingChui', Grade1: '10,13', recycle: '0;0;1,2,4,7' },
  12115: { id: 12115, cardName: '五行', type: 3, subType: 1, exType: 0, number: 1, color: 2, attRange: 4, attDistance: 0, defDistance: 0, spellId: 6009, imageId: 6009, cardClass: 'EquipCard', res: 'JiuJieBian', Grade1: '10,14', recycle: '0;0;1,2,4,7' },
  12116: { id: 12116, cardName: '玲珑', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 391, imageId: 391, cardClass: 'EquipCard', res: 'LingLongShiManDai', recycle: '0;0;1,2,4,7' },
  12117: { id: 12117, cardName: '百花', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 390, imageId: 390, cardClass: 'EquipCard', res: 'HongMianBaiHuaPao', recycle: '0;0;1,2,4,7' },
  12118: { id: 12118, cardName: '国风', type: 3, subType: 2, exType: 0, number: 9, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1129, imageId: 1129, cardClass: 'EquipCard', res: 'GuoFengYuPao', recycle: '0;0;1,2,4,7' },
  12119: { id: 12119, cardName: '奇门', type: 3, subType: 2, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1131, imageId: 1131, cardClass: 'EquipCard', res: 'QiMenBaZhen', recycle: '0;0;1,2,4,7' },
  12120: { id: 12120, cardName: '护心', type: 3, subType: 2, exType: 0, number: 1, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 2055, imageId: 2055, cardClass: 'EquipCard', res: 'HuXinJing', recycle: '0;0;1,2,4,7' },
  12121: { id: 12121, cardName: '黑光', type: 3, subType: 2, exType: 0, number: 2, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6011, imageId: 6011, cardClass: 'EquipCard', res: 'YuLinJia', Grade1: '11,15', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_36,6_42,7', recycle: '0;0;1,2,4,7' },
  12122: { id: 12122, cardName: '紫金', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 389, imageId: 389, cardClass: 'EquipCard', res: 'ShuFaZiJinGuan', recycle: '0;0;1,2,4,7' },
  12123: { id: 12123, cardName: '虚妄', type: 3, subType: 9, exType: 0, number: 4, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 1134, imageId: 1134, cardClass: 'EquipCard', res: 'XuWangZhiMian', recycle: '0;0;1,2,4,7' },
  12124: { id: 12124, cardName: '天机', type: 3, subType: 9, exType: 0, number: 12, color: 4, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6014, imageId: 6014, cardClass: 'EquipCard', res: 'TianJiTu', Grade1: '10,12', Specials: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_26,4_30,5_32,5_45,7_34,8_42,7', recycle: '0;0;1,2,4,7' },
  12125: { id: 12125, cardName: '太公', type: 3, subType: 9, exType: 0, number: 2, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6015, imageId: 6015, cardClass: 'EquipCard', res: 'TaiGongYinFu', Grade1: '13,16', recycle: '0;0;1,2,4,7' },
  12126: { id: 12126, cardName: '三略', type: 3, subType: 9, exType: 0, number: 5, color: 3, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6016, imageId: 6016, cardClass: 'EquipCard', res: 'SanLve', Grade1: '4,6', Grade2: '2,4', Grade3: '2,4', Grade4: '25,8_103,8_153,5_155,7_48,5_55,6_159,5_28,6_21,5_9,7_30,5_32,5_45,7_42,7', recycle: '0;0;1,2,4,7' },
  12127: { id: 12127, cardName: '照骨', type: 3, subType: 9, exType: 0, number: 1, color: 2, attRange: 0, attDistance: 0, defDistance: 0, spellId: 6018, imageId: 6018, cardClass: 'EquipCard', res: 'ZhaoGuJing', recycle: '0;0;1,2,4,7' }
}

let remCardCount = 0
let currentMode
let paidui = new Set() //, 别人摸未知牌不会改变,自己mainID摸牌会减少的牌,场上有明牌都会被移出,此牌堆包括别人手牌
var paiduiSum = 0 //用于计算的平均数,吉占
let qipai = new Set() //zone2 弃牌

let chuli = new Set() //zone3 处理区

let newShouPai = { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set(), 5: new Set(), 6: new Set(), 7: new Set() } //key为seat id而不是id，value为 zone5 手牌区
let newIdOrder = { 0: -1, 1: -1, 2: -1, 3: -1, 4: -1, 5: -1, 6: -1, 7: -1 } //key为玩家id，value为实际座位顺序
let biaoji = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] } //key为玩家id，value为zone4 标记区
let shoupai = { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set(), 5: new Set(), 6: new Set(), 7: new Set() } //key为seat id而不是id，value为 zone5 手牌区
let zhuangbei = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] } //key为玩家id，value为zone6 装备区
let panding = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] } //key为玩家id，value为zone7 判定区
let jineng = new Set() //观星询询会会出现
let zone10 = new Set() //祈禳甘露
let ding = []
let di = []
let seat = 0 //用于座位安排
let isGameStart = false
var div

let cardTypeGuoZhanYingBian = {
  决斗: { cardNum: 2, cardType: 2 },
  闪电: { cardNum: 1, cardType: 2 },
  八卦: { cardNum: 1, cardType: 3 },
  雌雄: { cardNum: 1, cardType: 3 },
  过拆: { cardNum: 2, cardType: 2 },
  绝影: { cardNum: 1, cardType: 3 },
  杀: { cardNum: 19, cardType: 1 },
  青釭: { cardNum: 1, cardType: 3 },
  酒: { cardNum: 3, cardType: 1 },
  兵: { cardNum: 2, cardType: 2 },
  铁索: { cardNum: 3, cardType: 2 },
  丈八: { cardNum: 1, cardType: 3 },
  桃园: { cardNum: 1, cardType: 2 },
  万箭: { cardNum: 1, cardType: 2 },
  闪: { cardNum: 14, cardType: 1 },
  五谷: { cardNum: 1, cardType: 2 },
  桃: { cardNum: 8, cardType: 1 },
  赤兔: { cardNum: 1, cardType: 3 },
  麒麟: { cardNum: 1, cardType: 3 },
  乐: { cardNum: 2, cardType: 2 },
  远交: { cardNum: 1, cardType: 2 },
  逸劳: { cardNum: 2, cardType: 2 },
  爪黄: { cardNum: 1, cardType: 3 },
  仁王: { cardNum: 1, cardType: 3 },
  知己: { cardNum: 2, cardType: 2 },
  雷杀: { cardNum: 3, cardType: 1 },
  国无: { cardNum: 2, cardType: 2 },
  连弩: { cardNum: 1, cardType: 3 },
  顺手: { cardNum: 1, cardType: 2 },
  贯石: { cardNum: 1, cardType: 3 },
  火杀: { cardNum: 3, cardType: 1 },
  吴六: { cardNum: 1, cardType: 3 },
  三尖: { cardNum: 1, cardType: 3 },
  紫骍: { cardNum: 1, cardType: 3 },
  水淹: { cardNum: 2, cardType: 2 },
  冰杀: { cardNum: 4, cardType: 1 },
  南蛮: { cardNum: 2, cardType: 2 },
  逐近: { cardNum: 2, cardType: 2 },
  无懈: { cardNum: 1, cardType: 2 },
  乌铁: { cardNum: 1, cardType: 3 },
  洞烛: { cardNum: 2, cardType: 2 },
  出其: { cardNum: 2, cardType: 2 },
  敕令: { cardNum: 1, cardType: 2 },
  太公: { cardNum: 1, cardType: 3 },
  藤甲: { cardNum: 1, cardType: 3 },
  护心: { cardNum: 1, cardType: 3 },
  铜雀: { cardNum: 1, cardType: 3 },
  五行: { cardNum: 1, cardType: 3 }
}

let cardTypeJunZhengBiaoZhun = {
  桃: { cardType: 1, cardNum: 12 },
  酒: { cardType: 1, cardNum: 5 },
  火杀: { cardType: 1, cardNum: 5 },
  杀: { cardType: 1, cardNum: 30 },
  雷杀: { cardType: 1, cardNum: 9 },
  闪: { cardType: 1, cardNum: 24 },
  南蛮: { cardType: 2, cardNum: 3 },
  万箭: { cardType: 2, cardNum: 1 },
  铁索: { cardType: 2, cardNum: 6 },
  决斗: { cardType: 2, cardNum: 3 },
  顺手: { cardType: 2, cardNum: 5 },
  火攻: { cardType: 2, cardNum: 3 },
  无中: { cardType: 2, cardNum: 4 },
  过拆: { cardType: 2, cardNum: 6 },
  无懈: { cardType: 2, cardNum: 7 },
  乐: { cardType: 2, cardNum: 3 },
  兵: { cardType: 2, cardNum: 2 },
  闪电: { cardType: 2, cardNum: 2 },
  桃园: { cardType: 2, cardNum: 1 },
  五谷: { cardType: 2, cardNum: 2 },
  借刀: { cardType: 2, cardNum: 2 },
  连弩: { cardType: 3, cardNum: 2 },
  寒冰: { cardType: 3, cardNum: 1 },
  青釭: { cardType: 3, cardNum: 1 },
  雌雄: { cardType: 3, cardNum: 1 },
  古锭: { cardType: 3, cardNum: 1 },
  青龙: { cardType: 3, cardNum: 1 },
  丈八: { cardType: 3, cardNum: 1 },
  贯石: { cardType: 3, cardNum: 1 },
  方天: { cardType: 3, cardNum: 1 },
  朱雀: { cardType: 3, cardNum: 1 },
  麒麟: { cardType: 3, cardNum: 1 },
  白银: { cardType: 3, cardNum: 1 },
  藤甲: { cardType: 3, cardNum: 2 },
  八卦: { cardType: 3, cardNum: 2 },
  仁王: { cardType: 3, cardNum: 1 },
  的卢: { cardType: 3, cardNum: 1 },
  绝影: { cardType: 3, cardNum: 1 },
  爪黄: { cardType: 3, cardNum: 1 },
  骅骝: { cardType: 3, cardNum: 1 },
  赤兔: { cardType: 3, cardNum: 1 },
  大宛: { cardType: 3, cardNum: 1 },
  紫骍: { cardType: 3, cardNum: 1 },
  木马: { cardType: 3, cardNum: 1 }
}

let cardTypeGuoZhanBiaoZhun = {
  南蛮: { cardNum: 2, cardType: 2 },
  万箭: { cardNum: 1, cardType: 2 },
  决斗: { cardNum: 2, cardType: 2 },
  无懈: { cardNum: 1, cardType: 2 },
  国无: { cardNum: 2, cardType: 2 },
  远交: { cardNum: 1, cardType: 2 },
  兵: { cardNum: 2, cardType: 2 },
  乐: { cardNum: 2, cardType: 2 },
  桃园: { cardNum: 1, cardType: 2 },
  铁索: { cardNum: 3, cardType: 2 },
  闪电: { cardNum: 1, cardType: 2 },
  借刀: { cardNum: 1, cardType: 2 },
  敕令: { cardNum: 1, cardType: 2 },
  逸劳: { cardNum: 2, cardType: 2 },
  无中: { cardNum: 2, cardType: 2 },
  知己: { cardNum: 2, cardType: 2 },
  顺手: { cardNum: 3, cardType: 2 },
  火攻: { cardNum: 2, cardType: 2 },
  五谷: { cardNum: 1, cardType: 2 },
  过拆: { cardNum: 3, cardType: 2 },
  桃: { cardNum: 8, cardType: 1 },
  杀: { cardNum: 21, cardType: 1 },
  雷杀: { cardNum: 5, cardType: 1 },
  火杀: { cardNum: 3, cardType: 1 },
  酒: { cardNum: 3, cardType: 1 },
  闪: { cardNum: 14, cardType: 1 },
  连弩: { cardNum: 1, cardType: 3 },
  吴六: { cardNum: 1, cardType: 3 },
  雌雄: { cardNum: 1, cardType: 3 },
  寒冰: { cardNum: 1, cardType: 3 },
  青釭: { cardNum: 1, cardType: 3 },
  丈八: { cardNum: 1, cardType: 3 },
  三尖: { cardNum: 1, cardType: 3 },
  贯石: { cardNum: 1, cardType: 3 },
  朱雀: { cardNum: 1, cardType: 3 },
  麒麟: { cardNum: 1, cardType: 3 },
  白银: { cardNum: 1, cardType: 3 },
  玉玺: { cardNum: 1, cardType: 3 },
  藤甲: { cardNum: 1, cardType: 3 },
  仁王: { cardNum: 1, cardType: 3 },
  八卦: { cardNum: 1, cardType: 3 },
  的卢: { cardNum: 1, cardType: 3 },
  爪黄: { cardNum: 1, cardType: 3 },
  绝影: { cardNum: 1, cardType: 3 },
  赤兔: { cardNum: 1, cardType: 3 },
  大宛: { cardNum: 1, cardType: 3 },
  紫骍: { cardNum: 1, cardType: 3 }
}

let cardTypeHuanLeBiaoZhun = {
  桃: { cardType: 1, cardNum: 12 },
  酒: { cardType: 1, cardNum: 5 },
  火杀: { cardType: 1, cardNum: 5 },
  杀: { cardType: 1, cardNum: 30 },
  雷杀: { cardType: 1, cardNum: 9 },
  闪: { cardType: 1, cardNum: 24 },
  南蛮: { cardType: 2, cardNum: 3 },
  万箭: { cardType: 2, cardNum: 1 },
  铁索: { cardType: 2, cardNum: 6 },
  决斗: { cardType: 2, cardNum: 3 },
  顺手: { cardType: 2, cardNum: 5 },
  火攻: { cardType: 2, cardNum: 3 },
  无中: { cardType: 2, cardNum: 4 },
  过拆: { cardType: 2, cardNum: 6 },
  无懈: { cardType: 2, cardNum: 7 },
  乐: { cardType: 2, cardNum: 3 },
  兵: { cardType: 2, cardNum: 2 },
  闪电: { cardType: 2, cardNum: 2 },
  桃园: { cardType: 2, cardNum: 1 },
  五谷: { cardType: 2, cardNum: 2 },
  借刀: { cardType: 2, cardNum: 2 },
  连弩: { cardType: 3, cardNum: 2 },
  寒冰: { cardType: 3, cardNum: 1 },
  青釭: { cardType: 3, cardNum: 1 },
  雌雄: { cardType: 3, cardNum: 1 },
  古锭: { cardType: 3, cardNum: 1 },
  青龙: { cardType: 3, cardNum: 1 },
  丈八: { cardType: 3, cardNum: 1 },
  贯石: { cardType: 3, cardNum: 1 },
  方天: { cardType: 3, cardNum: 1 },
  朱雀: { cardType: 3, cardNum: 1 },
  麒麟: { cardType: 3, cardNum: 1 },
  白银: { cardType: 3, cardNum: 1 },
  藤甲: { cardType: 3, cardNum: 2 },
  八卦: { cardType: 3, cardNum: 2 },
  仁王: { cardType: 3, cardNum: 1 },
  的卢: { cardType: 3, cardNum: 1 },
  绝影: { cardType: 3, cardNum: 1 },
  爪黄: { cardType: 3, cardNum: 1 },
  骅骝: { cardType: 3, cardNum: 1 },
  赤兔: { cardType: 3, cardNum: 1 },
  大宛: { cardType: 3, cardNum: 1 },
  紫骍: { cardType: 3, cardNum: 1 }
}

let cardTypeJunZhengYingBian = {
  木马: { cardType: 3, cardNum: 1 },
  决斗: { cardNum: 3, cardType: 2 },
  顺手: { cardNum: 3, cardType: 2 },
  贯石: { cardNum: 1, cardType: 3 },
  杀: { cardNum: 23, cardType: 1 },
  闪: { cardNum: 24, cardType: 1 },
  紫騂: { cardNum: 1, cardType: 3 },
  连弩: { cardNum: 2, cardType: 3 },
  桃: { cardNum: 12, cardType: 1 },
  五谷: { cardNum: 2, cardType: 2 },
  赤兔: { cardNum: 1, cardType: 3 },
  乐: { cardNum: 3, cardType: 2 },
  过拆: { cardNum: 3, cardType: 2 },
  麒麟: { cardNum: 1, cardType: 3 },
  爪黄: { cardNum: 1, cardType: 3 },
  无懈: { cardNum: 7, cardType: 2 },
  的卢: { cardNum: 1, cardType: 3 },
  雌雄: { cardNum: 1, cardType: 3 },
  绝影: { cardNum: 1, cardType: 3 },
  青釭: { cardNum: 1, cardType: 3 },
  八卦: { cardNum: 1, cardType: 3 },
  青龙: { cardNum: 1, cardType: 3 },
  丈八: { cardNum: 1, cardType: 3 },
  大宛: { cardNum: 1, cardType: 3 },
  闪电: { cardNum: 1, cardType: 2 },
  仁王: { cardNum: 1, cardType: 3 },
  火杀: { cardNum: 5, cardType: 1 },
  酒: { cardNum: 5, cardType: 1 },
  骅骝: { cardNum: 1, cardType: 3 },
  古锭: { cardNum: 1, cardType: 3 },
  藤甲: { cardNum: 2, cardType: 3 },
  雷杀: { cardNum: 11, cardType: 1 },
  兵: { cardNum: 2, cardType: 2 },
  铁索: { cardNum: 6, cardType: 2 },
  太公: { cardNum: 1, cardType: 3 },
  随机: { cardNum: 1, cardType: 2 },
  逐近: { cardNum: 4, cardType: 2 },
  水淹: { cardNum: 2, cardType: 2 },
  冰杀: { cardNum: 5, cardType: 1 },
  天机: { cardNum: 1, cardType: 3 },
  出其: { cardNum: 2, cardType: 2 },
  洞烛: { cardNum: 4, cardType: 2 },
  护心: { cardNum: 1, cardType: 3 },
  黑光: { cardNum: 1, cardType: 3 },
  铜雀: { cardNum: 1, cardType: 3 },
  五行: { cardNum: 1, cardType: 3 },
  乌铁: { cardNum: 1, cardType: 3 },
  南蛮: { cardNum: 3, cardType: 2 },
  桃园: { cardNum: 1, cardType: 2 },
  万箭: { cardNum: 1, cardType: 2 }
}

let cardTypeZhuGongSha = {
  桃: { cardType: 1, cardNum: 10 },
  酒: { cardType: 1, cardNum: 5 },
  火杀: { cardType: 1, cardNum: 5 },
  杀: { cardType: 1, cardNum: 34 },
  雷杀: { cardType: 1, cardNum: 9 },
  闪: { cardType: 1, cardNum: 20 },
  南蛮: { cardType: 2, cardNum: 3 },
  万箭: { cardType: 2, cardNum: 1 },
  铁索: { cardType: 2, cardNum: 6 },
  决斗: { cardType: 2, cardNum: 3 },
  顺手: { cardType: 2, cardNum: 5 },
  火攻: { cardType: 2, cardNum: 3 },
  无中: { cardType: 2, cardNum: 4 },
  过拆: { cardType: 2, cardNum: 6 },
  无懈: { cardType: 2, cardNum: 7 },
  乐: { cardType: 2, cardNum: 1 },
  兵: { cardType: 2, cardNum: 1 },
  闪电: { cardType: 2, cardNum: 2 },
  桃园: { cardType: 2, cardNum: 1 },
  五谷: { cardType: 2, cardNum: 2 },
  借刀: { cardType: 2, cardNum: 2 },
  连弩: { cardType: 3, cardNum: 2 },
  寒冰: { cardType: 3, cardNum: 1 },
  青釭: { cardType: 3, cardNum: 1 },
  雌雄: { cardType: 3, cardNum: 1 },
  古锭: { cardType: 3, cardNum: 1 },
  青龙: { cardType: 3, cardNum: 1 },
  丈八: { cardType: 3, cardNum: 1 },
  贯石: { cardType: 3, cardNum: 1 },
  方天: { cardType: 3, cardNum: 1 },
  朱雀: { cardType: 3, cardNum: 1 },
  麒麟: { cardType: 3, cardNum: 1 },
  白银: { cardType: 3, cardNum: 1 },
  藤甲: { cardType: 3, cardNum: 2 },
  八卦: { cardType: 3, cardNum: 2 },
  仁王: { cardType: 3, cardNum: 1 },
  的卢: { cardType: 3, cardNum: 1 },
  绝影: { cardType: 3, cardNum: 1 },
  爪黄: { cardType: 3, cardNum: 1 },
  骅骝: { cardType: 3, cardNum: 1 },
  赤兔: { cardType: 3, cardNum: 1 },
  大宛: { cardType: 3, cardNum: 1 },
  紫骍: { cardType: 3, cardNum: 1 }
}

let cardTypeShenZhiShiLian = {
  洪荒: { cardType: 2, cardNum: 1 },
  木马: { cardType: 3, cardNum: 1 },
  决斗: { cardNum: 3, cardType: 2 },
  顺手: { cardNum: 3, cardType: 2 },
  贯石: { cardNum: 1, cardType: 3 },
  杀: { cardNum: 23, cardType: 1 },
  闪: { cardNum: 24, cardType: 1 },
  紫騂: { cardNum: 1, cardType: 3 },
  连弩: { cardNum: 2, cardType: 3 },
  桃: { cardNum: 12, cardType: 1 },
  五谷: { cardNum: 2, cardType: 2 },
  赤兔: { cardNum: 1, cardType: 3 },
  乐: { cardNum: 3, cardType: 2 },
  过拆: { cardNum: 3, cardType: 2 },
  麒麟: { cardNum: 1, cardType: 3 },
  爪黄: { cardNum: 1, cardType: 3 },
  无懈: { cardNum: 7, cardType: 2 },
  的卢: { cardNum: 1, cardType: 3 },
  雌雄: { cardNum: 1, cardType: 3 },
  绝影: { cardNum: 1, cardType: 3 },
  青釭: { cardNum: 1, cardType: 3 },
  八卦: { cardNum: 1, cardType: 3 },
  青龙: { cardNum: 1, cardType: 3 },
  丈八: { cardNum: 1, cardType: 3 },
  大宛: { cardNum: 1, cardType: 3 },
  闪电: { cardNum: 1, cardType: 2 },
  仁王: { cardNum: 1, cardType: 3 },
  火杀: { cardNum: 5, cardType: 1 },
  酒: { cardNum: 5, cardType: 1 },
  骅骝: { cardNum: 1, cardType: 3 },
  古锭: { cardNum: 1, cardType: 3 },
  藤甲: { cardNum: 2, cardType: 3 },
  雷杀: { cardNum: 11, cardType: 1 },
  兵: { cardNum: 2, cardType: 2 },
  铁索: { cardNum: 6, cardType: 2 },
  太公: { cardNum: 1, cardType: 3 },
  随机: { cardNum: 1, cardType: 2 },
  逐近: { cardNum: 4, cardType: 2 },
  水淹: { cardNum: 2, cardType: 2 },
  冰杀: { cardNum: 5, cardType: 1 },
  天机: { cardNum: 1, cardType: 3 },
  出其: { cardNum: 2, cardType: 2 },
  洞烛: { cardNum: 4, cardType: 2 },
  护心: { cardNum: 1, cardType: 3 },
  黑光: { cardNum: 1, cardType: 3 },
  铜雀: { cardNum: 1, cardType: 3 },
  五行: { cardNum: 1, cardType: 3 },
  乌铁: { cardNum: 1, cardType: 3 },
  南蛮: { cardNum: 3, cardType: 2 },
  桃园: { cardNum: 1, cardType: 2 },
  万箭: { cardNum: 1, cardType: 2 }
}

let cardTypeDouDiZhu = {
  桃: { cardType: 1, cardNum: 12 },
  酒: { cardType: 1, cardNum: 7 },
  火杀: { cardType: 1, cardNum: 5 },
  杀: { cardType: 1, cardNum: 34 },
  雷杀: { cardType: 1, cardNum: 9 },
  闪: { cardType: 1, cardNum: 24 },
  南蛮: { cardType: 2, cardNum: 3 },
  万箭: { cardType: 2, cardNum: 1 },
  铁索: { cardType: 2, cardNum: 6 },
  决斗: { cardType: 2, cardNum: 3 },
  顺手: { cardType: 2, cardNum: 5 },
  火攻: { cardType: 2, cardNum: 3 },
  无中: { cardType: 2, cardNum: 4 },
  过拆: { cardType: 2, cardNum: 6 },
  无懈: { cardType: 2, cardNum: 7 },
  乐: { cardType: 2, cardNum: 3 },
  兵: { cardType: 2, cardNum: 2 },
  闪电: { cardType: 2, cardNum: 2 },
  桃园: { cardType: 2, cardNum: 1 },
  五谷: { cardType: 2, cardNum: 2 },
  借刀: { cardType: 2, cardNum: 2 },
  连弩: { cardType: 3, cardNum: 2 },
  寒冰: { cardType: 3, cardNum: 1 },
  青釭: { cardType: 3, cardNum: 1 },
  雌雄: { cardType: 3, cardNum: 1 },
  古锭: { cardType: 3, cardNum: 1 },
  青龙: { cardType: 3, cardNum: 1 },
  丈八: { cardType: 3, cardNum: 1 },
  贯石: { cardType: 3, cardNum: 1 },
  方天: { cardType: 3, cardNum: 1 },
  朱雀: { cardType: 3, cardNum: 1 },
  麒麟: { cardType: 3, cardNum: 1 },
  白银: { cardType: 3, cardNum: 1 },
  藤甲: { cardType: 3, cardNum: 2 },
  八卦: { cardType: 3, cardNum: 2 },
  仁王: { cardType: 3, cardNum: 1 },
  的卢: { cardType: 3, cardNum: 1 },
  绝影: { cardType: 3, cardNum: 1 },
  爪黄: { cardType: 3, cardNum: 1 },
  骅骝: { cardType: 3, cardNum: 1 },
  赤兔: { cardType: 3, cardNum: 1 },
  大宛: { cardType: 3, cardNum: 1 },
  紫骍: { cardType: 3, cardNum: 1 },
  木马: { cardType: 3, cardNum: 1 }
}

let currentCardType
let cardTypeButton = ''
//for draggable iframe
var x_pos = 0,
  y_pos = 0, // Stores x & y coordinates of the mouse pointer
  x_elem = 0,
  y_elem = 0, // Stores top, left values (edge) of the element
  selected = null // Object of the element to be moved

//cardType 基本1锦囊2装备3其他4
var isSeatOrder = false //座位是否安排好了
var isFrameAdd = false
var isShouQiKa = 0
var ShouQiKa = {}
var mainID
var diamond, spade, heart, club, spade2_9, hongsha, heisha
var arr = []
var combos = []
var closeIframe = true
var isJunZhengBiaoZhun = false
var isJunZhengBiaoZhunShanShan = false
var isJunZhengYingBian = false
var isJunZhengYingBianShanShan = false

var isShenZhiShiLian = false

var isGuoZhanBiaoZhun = false
var isGuoZhanYingBian = false
var isDouDiZhu = false

var isZhuGongSha = false
var isZhuGongShaShanShan = false

var isTongShuai = false

var isHuanLeBiaoZhun = false
var isHuanLeBiaoZhunShanShan = false
var size
var firstSeatID = 0
let idOrderNew = []
let idOrder = {} //key为玩家id，value为实际座位顺序
let idOrderPre = [] //按顺序存储idOrder
let idOrderPreSet = new Set() //按顺序存储idOrder
var calResult = []
var isDuanXian = false
var cardNumAndSuit
var remShouPai = new Set() //洗牌后剩余手牌
var insertInd //用于插入顶/底牌堆，黄承彦
var temShouPai //用于处理临时手牌
var DestSeatIDs
var DestSeatID
var isDiMeng = false //缔盟，清忠，等手牌全给情况
var b = String.fromCharCode('22068') + String.fromCharCode('27424') + String.fromCharCode('32773') + String.fromCharCode('24517') + String.fromCharCode('35803')
var isB = false
var mySeatID = new Set()
var boTu = new Set()
var enableBoTu = false
var luanJi = new Set()
var enableLuanJi = false
var enableQuanBian = false
var quanBian = new Set()
var enableHuaMu = false
var huaMu = new Set()
var unknownCard = []
var knownShouPai = new Set()
var emojiFontSize = '15px' // 可变的字体大小，可以根据需要进行调整

// var shenSunQuanSkill = {};
function gameStart() {
  //全部区域清空,牌堆回复张
  if (isJunZhengBiaoZhun) {
    paidui = new Set()
    for (let i = 1; i <= 161; i++) {
      paidui.add(i)
    }
    ;(diamond = 41), (spade = 40), (heart = 40), (club = 40), (spade2_9 = 25), (hongsha = 14), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：军争</b>'
  }
  if (isJunZhengBiaoZhunShanShan) {
    paidui = new Set()
    for (let i = 1; i <= 161; i++) {
      paidui.add(i)
    }
    paidui.delete(16)
    paidui.delete(18)
    paidui.delete(19)
    paidui.add(12140)
    paidui.add(12141)
    paidui.add(12142)
    ;(diamond = 41), (spade = 40), (heart = 40), (club = 40), (spade2_9 = 25), (hongsha = 14), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：军争</b>'
  } else if (isGuoZhanBiaoZhun) {
    paidui = new Set()
    for (let i = 1001; i <= 1108; i++) {
      paidui.add(i)
    }
    paidui.add(1148)
    paidui.add(1150)
    ;(diamond = 27), (spade = 27), (heart = 27), (club = 28), (spade2_9 = 17), (hongsha = 8), (heisha = 21)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：国战</b>'
  } else if (isGuoZhanYingBian) {
    paidui = new Set()
    for (let i = 1200; i <= 1307; i++) {
      paidui.add(i)
    }
    paidui.add(1150)
    ;(diamond = 26), (spade = 27), (heart = 28), (club = 28), (spade2_9 = 17), (hongsha = 8), (heisha = 21)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：国战应变</b>'
  } else if (isDouDiZhu) {
    paidui = new Set()
    for (let i = 1; i <= 160; i++) {
      paidui.add(i)
    }
    for (let i = 13000; i <= 13005; i++) {
      paidui.add(i)
    }
    ;(diamond = 43), (spade = 40), (heart = 43), (club = 40), (spade2_9 = 25), (hongsha = 18), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：斗地主</b>'
  } else if (isZhuGongSha) {
    paidui = new Set()
    for (let i = 1; i <= 160; i++) {
      paidui.add(i)
    }
    paidui.delete(144)
    paidui.delete(71)
    paidui.delete(32)
    for (let i = 13000; i <= 13005; i++) {
      paidui.add(i)
    }
    ;(diamond = 40), (spade = 39), (heart = 38), (club = 39), (spade2_9 = 25), (hongsha = 14), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：主公杀</b>'
  } else if (isZhuGongShaShanShan) {
    paidui = new Set()
    for (let i = 1; i <= 160; i++) {
      paidui.add(i)
    }
    for (let i = 13000; i <= 13005; i++) {
      paidui.add(i)
    }
    paidui.delete(144)
    paidui.delete(71)
    paidui.delete(32)
    ;(diamond = 40), (spade = 39), (heart = 38), (club = 39), (spade2_9 = 25), (hongsha = 14), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：主公杀</b>'
  }
  // else if(isTongShuai){
  //     paidui = new Set();
  //     for(let i = 3001; i<=3156; i++){paidui.add(i);}
  //     diamond=39, spade = 39, heart = 39, club = 39, spade2_9 = 17, hongsha = 14, heisha = 30;
  //     document.getElementById('iframe-source').contentWindow.document.getElementById("nav1").innerHTML = "<b>当前模式：统率</b>";
  //     // if(currentMode[cardID]["color"]==1){cardSuit = "♥";}
  //     // else if(currentMode[cardID]["color"]==2){cardSuit = "♦";}
  //     // else if(currentMode[cardID]["color"]==3){cardSuit = "♠";}
  //     // else if(currentMode[cardID]["color"]==4){cardSuit = "♣";}
  //
  // }
  else if (isHuanLeBiaoZhun) {
    paidui = new Set()
    for (let i = 1; i <= 160; i++) {
      paidui.add(i)
    }
    ;(diamond = 40), (spade = 40), (heart = 40), (club = 40), (spade2_9 = 25), (hongsha = 14), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：欢乐成双</b>'
  } else if (isHuanLeBiaoZhunShanShan) {
    paidui = new Set()
    for (let i = 1; i <= 160; i++) {
      paidui.add(i)
    }
    paidui.delete(16)
    paidui.delete(18)
    paidui.delete(19)
    paidui.add(12140)
    paidui.add(12141)
    paidui.add(12142)
    ;(diamond = 40), (spade = 40), (heart = 40), (club = 40), (spade2_9 = 25), (hongsha = 14), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：欢乐成双</b>'
  } else if (isJunZhengYingBian) {
    paidui = new Set()
    for (let i = 7001; i <= 7160; i++) {
      paidui.add(i)
    }
    paidui.add(161)
    ;(diamond = 41), (spade = 40), (heart = 40), (club = 40), (spade2_9 = 25), (hongsha = 14), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：军争应变</b>'
  } else if (isJunZhengYingBianShanShan) {
    paidui = new Set()
    for (let i = 7001; i <= 7160; i++) {
      paidui.add(i)
    }
    paidui.add(161)
    paidui.add(12140)
    paidui.add(12141)
    paidui.add(12142)
    ;(diamond = 41), (spade = 40), (heart = 40), (club = 40), (spade2_9 = 25), (hongsha = 14), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：军争应变</b>'
  } else if (isShenZhiShiLian) {
    paidui = new Set()
    for (let i = 7001; i <= 7160; i++) {
      paidui.add(i)
    }
    paidui.add(161)
    paidui.add(201)
    ;(diamond = 41), (spade = 41), (heart = 40), (club = 40), (spade2_9 = 25), (hongsha = 14), (heisha = 30)
    document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>当前模式：神之试炼</b>'
  }
  qipai = new Set() //zone2 弃牌
  chuli = new Set() //zone3 处理区
  biaoji = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] } //key为玩家id，value为zone4 标记区
  shoupai = { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set(), 5: new Set(), 6: new Set(), 7: new Set() } //key为seat id而不是id，value为 zone5 手牌区
  zhuangbei = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] } //key为玩家id，value为zone6 装备区
  panding = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] } //key为玩家id，value为zone7 判定区
  jineng = new Set() //观星询询会会出现 zone8
  zone10 = new Set() //祈禳甘露 zone 10
  ding = []
  di = []
  idOrder = {} //key为玩家id，value为实际座位顺序
  seat = 0 //用于座位安排
  isGameStart = false
  div = window.div

  cardTypeGuoZhanYingBian = {
    决斗: { cardNum: 2, cardType: 2 },
    闪电: { cardNum: 1, cardType: 2 },
    八卦: { cardNum: 1, cardType: 3 },
    雌雄: { cardNum: 1, cardType: 3 },
    过拆: { cardNum: 2, cardType: 2 },
    绝影: { cardNum: 1, cardType: 3 },
    杀: { cardNum: 19, cardType: 1 },
    青釭: { cardNum: 1, cardType: 3 },
    酒: { cardNum: 3, cardType: 1 },
    兵: { cardNum: 2, cardType: 2 },
    铁索: { cardNum: 3, cardType: 2 },
    丈八: { cardNum: 1, cardType: 3 },
    桃园: { cardNum: 1, cardType: 2 },
    万箭: { cardNum: 1, cardType: 2 },
    闪: { cardNum: 14, cardType: 1 },
    五谷: { cardNum: 1, cardType: 2 },
    桃: { cardNum: 8, cardType: 1 },
    赤兔: { cardNum: 1, cardType: 3 },
    麒麟: { cardNum: 1, cardType: 3 },
    乐: { cardNum: 2, cardType: 2 },
    远交: { cardNum: 1, cardType: 2 },
    逸劳: { cardNum: 2, cardType: 2 },
    爪黄: { cardNum: 1, cardType: 3 },
    仁王: { cardNum: 1, cardType: 3 },
    知己: { cardNum: 2, cardType: 2 },
    雷杀: { cardNum: 3, cardType: 1 },
    国无: { cardNum: 2, cardType: 2 },
    连弩: { cardNum: 1, cardType: 3 },
    顺手: { cardNum: 1, cardType: 2 },
    贯石: { cardNum: 1, cardType: 3 },
    火杀: { cardNum: 3, cardType: 1 },
    吴六: { cardNum: 1, cardType: 3 },
    三尖: { cardNum: 1, cardType: 3 },
    紫骍: { cardNum: 1, cardType: 3 },
    水淹: { cardNum: 2, cardType: 2 },
    冰杀: { cardNum: 4, cardType: 1 },
    南蛮: { cardNum: 2, cardType: 2 },
    逐近: { cardNum: 2, cardType: 2 },
    无懈: { cardNum: 1, cardType: 2 },
    乌铁: { cardNum: 1, cardType: 3 },
    洞烛: { cardNum: 2, cardType: 2 },
    出其: { cardNum: 2, cardType: 2 },
    敕令: { cardNum: 1, cardType: 2 },
    太公: { cardNum: 1, cardType: 3 },
    藤甲: { cardNum: 1, cardType: 3 },
    护心: { cardNum: 1, cardType: 3 },
    铜雀: { cardNum: 1, cardType: 3 },
    五行: { cardNum: 1, cardType: 3 }
  }
  cardTypeJunZhengBiaoZhun = {
    桃: { cardType: 1, cardNum: 12 },
    酒: { cardType: 1, cardNum: 5 },
    火杀: { cardType: 1, cardNum: 5 },
    杀: { cardType: 1, cardNum: 30 },
    雷杀: { cardType: 1, cardNum: 9 },
    闪: { cardType: 1, cardNum: 24 },
    南蛮: { cardType: 2, cardNum: 3 },
    万箭: { cardType: 2, cardNum: 1 },
    铁索: { cardType: 2, cardNum: 6 },
    决斗: { cardType: 2, cardNum: 3 },
    顺手: { cardType: 2, cardNum: 5 },
    火攻: { cardType: 2, cardNum: 3 },
    无中: { cardType: 2, cardNum: 4 },
    过拆: { cardType: 2, cardNum: 6 },
    无懈: { cardType: 2, cardNum: 7 },
    乐: { cardType: 2, cardNum: 3 },
    兵: { cardType: 2, cardNum: 2 },
    闪电: { cardType: 2, cardNum: 2 },
    桃园: { cardType: 2, cardNum: 1 },
    五谷: { cardType: 2, cardNum: 2 },
    借刀: { cardType: 2, cardNum: 2 },
    连弩: { cardType: 3, cardNum: 2 },
    寒冰: { cardType: 3, cardNum: 1 },
    青釭: { cardType: 3, cardNum: 1 },
    雌雄: { cardType: 3, cardNum: 1 },
    古锭: { cardType: 3, cardNum: 1 },
    青龙: { cardType: 3, cardNum: 1 },
    丈八: { cardType: 3, cardNum: 1 },
    贯石: { cardType: 3, cardNum: 1 },
    方天: { cardType: 3, cardNum: 1 },
    朱雀: { cardType: 3, cardNum: 1 },
    麒麟: { cardType: 3, cardNum: 1 },
    白银: { cardType: 3, cardNum: 1 },
    藤甲: { cardType: 3, cardNum: 2 },
    八卦: { cardType: 3, cardNum: 2 },
    仁王: { cardType: 3, cardNum: 1 },
    的卢: { cardType: 3, cardNum: 1 },
    绝影: { cardType: 3, cardNum: 1 },
    爪黄: { cardType: 3, cardNum: 1 },
    骅骝: { cardType: 3, cardNum: 1 },
    赤兔: { cardType: 3, cardNum: 1 },
    大宛: { cardType: 3, cardNum: 1 },
    紫骍: { cardType: 3, cardNum: 1 },
    木马: { cardType: 3, cardNum: 1 }
  }
  cardTypeGuoZhanBiaoZhun = {
    南蛮: { cardNum: 2, cardType: 2 },
    万箭: { cardNum: 1, cardType: 2 },
    决斗: { cardNum: 2, cardType: 2 },
    无懈: { cardNum: 1, cardType: 2 },
    国无: { cardNum: 2, cardType: 2 },
    远交: { cardNum: 1, cardType: 2 },
    兵: { cardNum: 2, cardType: 2 },
    乐: { cardNum: 2, cardType: 2 },
    桃园: { cardNum: 1, cardType: 2 },
    铁索: { cardNum: 3, cardType: 2 },
    闪电: { cardNum: 1, cardType: 2 },
    借刀: { cardNum: 1, cardType: 2 },
    逸劳: { cardNum: 2, cardType: 2 },
    无中: { cardNum: 2, cardType: 2 },
    知己: { cardNum: 2, cardType: 2 },
    顺手: { cardNum: 3, cardType: 2 },
    火攻: { cardNum: 2, cardType: 2 },
    五谷: { cardNum: 1, cardType: 2 },
    过拆: { cardNum: 3, cardType: 2 },
    桃: { cardNum: 8, cardType: 1 },
    杀: { cardNum: 21, cardType: 1 },
    雷杀: { cardNum: 5, cardType: 1 },
    火杀: { cardNum: 3, cardType: 1 },
    酒: { cardNum: 3, cardType: 1 },
    闪: { cardNum: 14, cardType: 1 },
    连弩: { cardNum: 1, cardType: 3 },
    吴六: { cardNum: 1, cardType: 3 },
    雌雄: { cardNum: 1, cardType: 3 },
    寒冰: { cardNum: 1, cardType: 3 },
    青釭: { cardNum: 1, cardType: 3 },
    丈八: { cardNum: 1, cardType: 3 },
    三尖: { cardNum: 1, cardType: 3 },
    贯石: { cardNum: 1, cardType: 3 },
    朱雀: { cardNum: 1, cardType: 3 },
    麒麟: { cardNum: 1, cardType: 3 },
    白银: { cardNum: 1, cardType: 3 },
    藤甲: { cardNum: 1, cardType: 3 },
    仁王: { cardNum: 1, cardType: 3 },
    八卦: { cardNum: 1, cardType: 3 },
    的卢: { cardNum: 1, cardType: 3 },
    爪黄: { cardNum: 1, cardType: 3 },
    绝影: { cardNum: 1, cardType: 3 },
    赤兔: { cardNum: 1, cardType: 3 },
    大宛: { cardNum: 1, cardType: 3 },
    紫骍: { cardNum: 1, cardType: 3 }
  }
  cardTypeHuanLeBiaoZhun = {
    桃: { cardType: 1, cardNum: 12 },
    酒: { cardType: 1, cardNum: 5 },
    火杀: { cardType: 1, cardNum: 5 },
    杀: { cardType: 1, cardNum: 30 },
    雷杀: { cardType: 1, cardNum: 9 },
    闪: { cardType: 1, cardNum: 24 },
    南蛮: { cardType: 2, cardNum: 3 },
    万箭: { cardType: 2, cardNum: 1 },
    铁索: { cardType: 2, cardNum: 6 },
    决斗: { cardType: 2, cardNum: 3 },
    顺手: { cardType: 2, cardNum: 5 },
    火攻: { cardType: 2, cardNum: 3 },
    无中: { cardType: 2, cardNum: 4 },
    过拆: { cardType: 2, cardNum: 6 },
    无懈: { cardType: 2, cardNum: 7 },
    乐: { cardType: 2, cardNum: 3 },
    兵: { cardType: 2, cardNum: 2 },
    闪电: { cardType: 2, cardNum: 2 },
    桃园: { cardType: 2, cardNum: 1 },
    五谷: { cardType: 2, cardNum: 2 },
    借刀: { cardType: 2, cardNum: 2 },
    连弩: { cardType: 3, cardNum: 2 },
    寒冰: { cardType: 3, cardNum: 1 },
    青釭: { cardType: 3, cardNum: 1 },
    雌雄: { cardType: 3, cardNum: 1 },
    古锭: { cardType: 3, cardNum: 1 },
    青龙: { cardType: 3, cardNum: 1 },
    丈八: { cardType: 3, cardNum: 1 },
    贯石: { cardType: 3, cardNum: 1 },
    方天: { cardType: 3, cardNum: 1 },
    朱雀: { cardType: 3, cardNum: 1 },
    麒麟: { cardType: 3, cardNum: 1 },
    白银: { cardType: 3, cardNum: 1 },
    藤甲: { cardType: 3, cardNum: 2 },
    八卦: { cardType: 3, cardNum: 2 },
    仁王: { cardType: 3, cardNum: 1 },
    的卢: { cardType: 3, cardNum: 1 },
    绝影: { cardType: 3, cardNum: 1 },
    爪黄: { cardType: 3, cardNum: 1 },
    骅骝: { cardType: 3, cardNum: 1 },
    赤兔: { cardType: 3, cardNum: 1 },
    大宛: { cardType: 3, cardNum: 1 },
    紫骍: { cardType: 3, cardNum: 1 }
  }
  cardTypeJunZhengYingBian = {
    木马: { cardType: 3, cardNum: 1 },
    决斗: { cardNum: 3, cardType: 2 },
    顺手: { cardNum: 3, cardType: 2 },
    贯石: { cardNum: 1, cardType: 3 },
    杀: { cardNum: 23, cardType: 1 },
    闪: { cardNum: 24, cardType: 1 },
    紫騂: { cardNum: 1, cardType: 3 },
    连弩: { cardNum: 2, cardType: 3 },
    桃: { cardNum: 12, cardType: 1 },
    五谷: { cardNum: 2, cardType: 2 },
    赤兔: { cardNum: 1, cardType: 3 },
    乐: { cardNum: 3, cardType: 2 },
    过拆: { cardNum: 3, cardType: 2 },
    麒麟: { cardNum: 1, cardType: 3 },
    爪黄: { cardNum: 1, cardType: 3 },
    无懈: { cardNum: 7, cardType: 2 },
    的卢: { cardNum: 1, cardType: 3 },
    雌雄: { cardNum: 1, cardType: 3 },
    绝影: { cardNum: 1, cardType: 3 },
    青釭: { cardNum: 1, cardType: 3 },
    八卦: { cardNum: 1, cardType: 3 },
    青龙: { cardNum: 1, cardType: 3 },
    丈八: { cardNum: 1, cardType: 3 },
    大宛: { cardNum: 1, cardType: 3 },
    闪电: { cardNum: 1, cardType: 2 },
    仁王: { cardNum: 1, cardType: 3 },
    火杀: { cardNum: 5, cardType: 1 },
    酒: { cardNum: 5, cardType: 1 },
    骅骝: { cardNum: 1, cardType: 3 },
    古锭: { cardNum: 1, cardType: 3 },
    藤甲: { cardNum: 2, cardType: 3 },
    雷杀: { cardNum: 11, cardType: 1 },
    兵: { cardNum: 2, cardType: 2 },
    铁索: { cardNum: 6, cardType: 2 },
    太公: { cardNum: 1, cardType: 3 },
    随机: { cardNum: 1, cardType: 2 },
    逐近: { cardNum: 4, cardType: 2 },
    水淹: { cardNum: 2, cardType: 2 },
    冰杀: { cardNum: 5, cardType: 1 },
    天机: { cardNum: 1, cardType: 3 },
    出其: { cardNum: 2, cardType: 2 },
    洞烛: { cardNum: 4, cardType: 2 },
    护心: { cardNum: 1, cardType: 3 },
    黑光: { cardNum: 1, cardType: 3 },
    铜雀: { cardNum: 1, cardType: 3 },
    五行: { cardNum: 1, cardType: 3 },
    乌铁: { cardNum: 1, cardType: 3 },
    南蛮: { cardNum: 3, cardType: 2 },
    桃园: { cardNum: 1, cardType: 2 },
    万箭: { cardNum: 1, cardType: 2 }
  }
  cardTypeShenZhiShiLian = {
    洪荒: { cardType: 2, cardNum: 1 },
    木马: { cardType: 3, cardNum: 1 },
    决斗: { cardNum: 3, cardType: 2 },
    顺手: { cardNum: 3, cardType: 2 },
    贯石: { cardNum: 1, cardType: 3 },
    杀: { cardNum: 23, cardType: 1 },
    闪: { cardNum: 24, cardType: 1 },
    紫騂: { cardNum: 1, cardType: 3 },
    连弩: { cardNum: 2, cardType: 3 },
    桃: { cardNum: 12, cardType: 1 },
    五谷: { cardNum: 2, cardType: 2 },
    赤兔: { cardNum: 1, cardType: 3 },
    乐: { cardNum: 3, cardType: 2 },
    过拆: { cardNum: 3, cardType: 2 },
    麒麟: { cardNum: 1, cardType: 3 },
    爪黄: { cardNum: 1, cardType: 3 },
    无懈: { cardNum: 7, cardType: 2 },
    的卢: { cardNum: 1, cardType: 3 },
    雌雄: { cardNum: 1, cardType: 3 },
    绝影: { cardNum: 1, cardType: 3 },
    青釭: { cardNum: 1, cardType: 3 },
    八卦: { cardNum: 1, cardType: 3 },
    青龙: { cardNum: 1, cardType: 3 },
    丈八: { cardNum: 1, cardType: 3 },
    大宛: { cardNum: 1, cardType: 3 },
    闪电: { cardNum: 1, cardType: 2 },
    仁王: { cardNum: 1, cardType: 3 },
    火杀: { cardNum: 5, cardType: 1 },
    酒: { cardNum: 5, cardType: 1 },
    骅骝: { cardNum: 1, cardType: 3 },
    古锭: { cardNum: 1, cardType: 3 },
    藤甲: { cardNum: 2, cardType: 3 },
    雷杀: { cardNum: 11, cardType: 1 },
    兵: { cardNum: 2, cardType: 2 },
    铁索: { cardNum: 6, cardType: 2 },
    太公: { cardNum: 1, cardType: 3 },
    随机: { cardNum: 1, cardType: 2 },
    逐近: { cardNum: 4, cardType: 2 },
    水淹: { cardNum: 2, cardType: 2 },
    冰杀: { cardNum: 5, cardType: 1 },
    天机: { cardNum: 1, cardType: 3 },
    出其: { cardNum: 2, cardType: 2 },
    洞烛: { cardNum: 4, cardType: 2 },
    护心: { cardNum: 1, cardType: 3 },
    黑光: { cardNum: 1, cardType: 3 },
    铜雀: { cardNum: 1, cardType: 3 },
    五行: { cardNum: 1, cardType: 3 },
    乌铁: { cardNum: 1, cardType: 3 },
    南蛮: { cardNum: 3, cardType: 2 },
    桃园: { cardNum: 1, cardType: 2 },
    万箭: { cardNum: 1, cardType: 2 }
  }
  cardTypeZhuGongSha = {
    桃: { cardType: 1, cardNum: 10 },
    酒: { cardType: 1, cardNum: 5 },
    火杀: { cardType: 1, cardNum: 5 },
    杀: { cardType: 1, cardNum: 30 },
    雷杀: { cardType: 1, cardNum: 9 },
    闪: { cardType: 1, cardNum: 20 },
    南蛮: { cardType: 2, cardNum: 3 },
    万箭: { cardType: 2, cardNum: 1 },
    铁索: { cardType: 2, cardNum: 6 },
    决斗: { cardType: 2, cardNum: 3 },
    顺手: { cardType: 2, cardNum: 5 },
    火攻: { cardType: 2, cardNum: 3 },
    无中: { cardType: 2, cardNum: 4 },
    过拆: { cardType: 2, cardNum: 6 },
    无懈: { cardType: 2, cardNum: 7 },
    乐: { cardType: 2, cardNum: 1 },
    兵: { cardType: 2, cardNum: 1 },
    闪电: { cardType: 2, cardNum: 2 },
    桃园: { cardType: 2, cardNum: 1 },
    五谷: { cardType: 2, cardNum: 2 },
    借刀: { cardType: 2, cardNum: 2 },
    连弩: { cardType: 3, cardNum: 2 },
    寒冰: { cardType: 3, cardNum: 1 },
    青釭: { cardType: 3, cardNum: 1 },
    雌雄: { cardType: 3, cardNum: 1 },
    古锭: { cardType: 3, cardNum: 1 },
    青龙: { cardType: 3, cardNum: 1 },
    丈八: { cardType: 3, cardNum: 1 },
    贯石: { cardType: 3, cardNum: 1 },
    方天: { cardType: 3, cardNum: 1 },
    朱雀: { cardType: 3, cardNum: 1 },
    麒麟: { cardType: 3, cardNum: 1 },
    白银: { cardType: 3, cardNum: 1 },
    藤甲: { cardType: 3, cardNum: 2 },
    八卦: { cardType: 3, cardNum: 2 },
    仁王: { cardType: 3, cardNum: 1 },
    的卢: { cardType: 3, cardNum: 1 },
    绝影: { cardType: 3, cardNum: 1 },
    爪黄: { cardType: 3, cardNum: 1 },
    骅骝: { cardType: 3, cardNum: 1 },
    赤兔: { cardType: 3, cardNum: 1 },
    大宛: { cardType: 3, cardNum: 1 },
    紫骍: { cardType: 3, cardNum: 1 },
    木马: { cardType: 3, cardNum: 1 }
  }

  cardTypeButton = ''
  //for draggable iframe
  ;(x_pos = 0),
    (y_pos = 0), // Stores x & y coordinates of the mouse pointer
    (x_elem = 0),
    (y_elem = 0), // Stores top, left values (edge) of the element
    (selected = null) // Object of the element to be moved

  //cardType 基本1锦囊2装备3其他4
  isSeatOrder = false //座位是否安排好了
  isFrameAdd = false
  isShouQiKa = 0
  ShouQiKa = {}
  arr = []
  combos = []
  newIdOrder = {}
  newShouPai = {}
  idOrderPreSet = new Set()
  idOrderPre = []
  isDuanXian = false
  remShouPai = new Set()
  for (let i = 0; i < 8; i++) {
    let seatID = (i + 1).toString()
    document.getElementById('iframe-source').contentWindow.document.getElementById(seatID).innerHTML = ''
  }
  temShouPai = new Set() //用于处理临时手牌
  isDiMeng = false //缔盟
  mySeatID = new Set() //用于计算糜竺13点，自己的位置
  isFirstTime = true
  idOrderNew = []
  GuoZhanGeneral = []
  oldGeneralID = 999
  GeneralID = 999
  mySkin = 0
  boTu = new Set()
  enableBoTu = false
  luanJi = new Set()
  enableLuanJi = false
  clearSuit()
  enableQuanBian = false
  quanBian = new Set()
  enableHuaMu = false
  huaMu = new Set()
  unknownCard = []
  knownShouPai = new Set()
}

function drawRemShouPai(remShouPai) {
  var knownCardsDiv = document.getElementById('iframe-source').contentWindow.document.getElementById('knownCards')
  var knownCardsInHandDiv = document.getElementById('iframe-source').contentWindow.document.getElementById('knownCardsInHand')
  knownCardsDiv.innerText = ''
  const shoupaiDIV = document.createElement('div')
  for (const c of remShouPai) {
    var button = document.createElement('button')
    if (getCardNumAndSuit(c)['cardSuit'] == '♦' || getCardNumAndSuit(c)['cardSuit'] == '♥') {
      button.className = 'shoupaiR' //红色手牌
    } else {
      button.className = 'shoupai'
    }
    let emojiWrapper = document.createElement('div')
    emojiWrapper.style.width = '100%'
    emojiWrapper.style.textAlign = 'center'

    let emoji = document.createElement('span')
    emoji.style.fontSize = emojiFontSize // 应用可变的字体大小
    emoji.innerText = getCardNumAndSuit(c)['cardNumAndSuit']

    emojiWrapper.appendChild(emoji)
    button.appendChild(emojiWrapper)
    button.innerHTML += currentMode[c]['cardName']
    shoupaiDIV.append(button)
  }

  knownCardsDiv.style.border = '1px rgb(40,40,40) solid'
  knownCardsDiv.style.animation = 'blink 2s'
  knownCardsDiv.style.animationIterationCount = 'infinite'

  knownCardsDiv.innerHTML = shoupaiDIV.innerHTML
  if (!knownCardsDiv.innerText == '') {
    knownCardsInHandDiv.style.display = 'block'
  }
}

function drawDingOrDi(ding, di) {
  var DingCardsDiv = document.getElementById('iframe-source').contentWindow.document.getElementById('dingCards')
  var DiCardsDiv = document.getElementById('iframe-source').contentWindow.document.getElementById('diCards')
  DingCardsDiv.innerText = ''
  DiCardsDiv.innerText = ''
  const cardDIV = document.createElement('div')
  var dingReverse = ding.slice().reverse()
  for (const c of dingReverse) {
    var button = document.createElement('button')
    if (getCardNumAndSuit(c)['cardSuit'] == '♦' || getCardNumAndSuit(c)['cardSuit'] == '♥') {
      button.className = 'shoupaiR' //红色手牌
    } else {
      button.className = 'shoupai'
    }
    let emojiWrapper = document.createElement('div')
    emojiWrapper.style.width = '100%'
    emojiWrapper.style.textAlign = 'center'

    let emoji = document.createElement('span')
    emoji.style.fontSize = emojiFontSize // 应用可变的字体大小
    emoji.innerText = getCardNumAndSuit(c)['cardNumAndSuit']

    emojiWrapper.appendChild(emoji)
    button.appendChild(emojiWrapper)
    button.innerHTML += currentMode[c]['cardName']
    DingCardsDiv.append(button)
  }
  var diReverse = di.slice().reverse()
  for (const c of diReverse) {
    var button = document.createElement('button')
    if (getCardNumAndSuit(c)['cardSuit'] == '♦' || getCardNumAndSuit(c)['cardSuit'] == '♥') {
      button.className = 'shoupaiR' //红色手牌
    } else {
      button.className = 'shoupai'
    }
    let emojiWrapper = document.createElement('div')
    emojiWrapper.style.width = '100%'
    emojiWrapper.style.textAlign = 'center'

    let emoji = document.createElement('span')
    emoji.style.fontSize = emojiFontSize // 应用可变的字体大小
    emoji.innerText = getCardNumAndSuit(c)['cardNumAndSuit']

    emojiWrapper.appendChild(emoji)
    button.appendChild(emojiWrapper)
    button.innerHTML += currentMode[c]['cardName']
    DiCardsDiv.append(button)
  }
  DingCardsDiv.innerHTML = DingCardsDiv.innerHTML
  DiCardsDiv.innerHTML = DiCardsDiv.innerHTML
  if (DiCardsDiv.innerText == '') {
    DiCardsDiv.style.display = 'none'
  } else {
    DiCardsDiv.style.display = 'block'
  }
  if (DingCardsDiv.innerText == '') {
    DingCardsDiv.style.display = 'none'
  } else {
    DingCardsDiv.style.display = 'block'
  }
}

function JiZhanCal(cardNum) {
  var bigger = 0
  var smaller = 0
  for (const card of paidui) {
    if (parseInt(getCardNumAndSuit(card)['cardNum']) > cardNum) {
      bigger++
    }
    if (parseInt(getCardNumAndSuit(card)['cardNum']) < cardNum) {
      smaller++
    }
  }
  // paidui.forEach(c => paiduiSum+=parseInt(getCardNumAndSuit(c)["cardNum"]));
  document.getElementById('iframe-source').contentWindow.document.getElementById('jizhan').innerHTML = '牌堆比' + cardNum + '大张数：' + bigger + '<br>' + '牌堆比' + cardNum + '小张数：' + smaller
}

var MiZhuCards = [10, 2, 3, 7, 6]
var MiZhuRes
//记录结果的位置，如果有相同则略过
var pathArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var pathSum
var pathArrSet = new Set()

function MiZhuCal(arr, n) {
  pathArrSet = new Set()
  MiZhuRes = []
  var opsize = Math.pow(2, MiZhuCards.length)
  // Run from counter 000..1 to 111..1
  for (let counter = 1; counter < opsize; counter++) {
    pathArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    pathSum = 0

    for (let j = 0; j < n; j++) {
      // Check if jth bit in the counter is set
      // If set then print jth element from arr[]
      if ((counter & (1 << j)) != 0) {
        pathSum += arr[j]
        pathArr[arr[j]]++ //位数加一
      }
    }
    if (pathSum == 13 && !pathArrSet.has(JSON.stringify(pathArr))) {
      pathArrSet.add(JSON.stringify(pathArr))
      var toPathArr = []
      for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < pathArr[i]; j++) {
          toPathArr.push(i)
        }
      }
      MiZhuRes.push(toPathArr)
      if (MiZhuRes.length >= 10) {
        return MiZhuRes
      }
    }
  }
}

function drawMiZhu(MiZhuRes) {
  var MiZhuResHTML = document.getElementById('iframe-source').contentWindow.document.getElementById('res')
  MiZhuResHTML.innerText = ''
  if (MiZhuRes.length == 0) {
    document.getElementById('iframe-source').contentWindow.document.getElementById('res').innerHTML = "<span style='color: red'>无结果!</span>"
  } else {
    for (let sebs of MiZhuRes) {
      let span = document.createElement('span')
      var spanText = ''
      span.className = 'calRes'
      for (let seb of sebs) {
        spanText += ' ' + transformLetter(seb)
      }
      span.innerText = spanText
      span.onmousedown = function () {
        toClipboard(spanText)
        span.innerText = '复制成功'
        setTimeout(() => {
          span.textContent = spanText
        }, '500')
      }
      MiZhuResHTML.append(span)
      var br = document.createElement('br')
      MiZhuResHTML.append(br)
    }
  }
}

function toClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData('Text', text)
  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = document.createElement('textarea')
    textarea.textContent = text
    textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea)
    textarea.select()
    try {
      return document.execCommand('copy') // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex)
      return prompt('Copy to clipboard: Ctrl+C, Enter', text)
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

function addSuit(cardID) {
  var toBeAdd = document.getElementById('iframe-source').contentWindow.document.getElementById('suit')
  if (enableBoTu) {
    if (getCardNumAndSuit(cardID)['cardSuit'] == '♦' && !boTu.has('♦')) {
      toBeAdd.innerText += '♦'
      boTu.add('♦')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♥' && !boTu.has('♥')) {
      toBeAdd.innerText += '♥'
      boTu.add('♥')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♠' && !boTu.has('♠')) {
      toBeAdd.innerText += '♠'
      boTu.add('♠')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♣' && !boTu.has('♣')) {
      toBeAdd.innerText += '♣'
      boTu.add('♣')
    }
  }
  if (enableLuanJi) {
    if (getCardNumAndSuit(cardID)['cardSuit'] == '♦' && !luanJi.has('♦')) {
      toBeAdd.innerText += '♦'
      luanJi.add('♦')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♥' && !luanJi.has('♥')) {
      toBeAdd.innerText += '♥'
      luanJi.add('♥')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♠' && !luanJi.has('♠')) {
      toBeAdd.innerText += '♠'
      luanJi.add('♠')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♣' && !luanJi.has('♣')) {
      toBeAdd.innerText += '♣'
      luanJi.add('♣')
    }
  }
  if (enableQuanBian) {
    if (getCardNumAndSuit(cardID)['cardSuit'] == '♦' && !quanBian.has('♦')) {
      toBeAdd.innerText += '♦'
      quanBian.add('♦')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♥' && !quanBian.has('♥')) {
      toBeAdd.innerText += '♥'
      quanBian.add('♥')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♠' && !quanBian.has('♠')) {
      toBeAdd.innerText += '♠'
      quanBian.add('♠')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♣' && !quanBian.has('♣')) {
      toBeAdd.innerText += '♣'
      quanBian.add('♣')
    }
  }
  if (enableHuaMu) {
    clearSuit()
    if (getCardNumAndSuit(cardID)['cardSuit'] == '♦') {
      toBeAdd.innerText += '🟥'
      huaMu.add('♦')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♥') {
      toBeAdd.innerText += '🟥'
      huaMu.add('♥')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♠') {
      toBeAdd.innerText += '⬛️'
      huaMu.add('♠')
    } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♣') {
      toBeAdd.innerText += '⬛️'
      huaMu.add('♣')
    }
  }
}

function clearSuit() {
  if (enableQuanBian) {
    quanBian = new Set()
    document.getElementById('iframe-source').contentWindow.document.getElementById('suit').innerText = '权变 '
  }
  if (enableHuaMu) {
    document.getElementById('iframe-source').contentWindow.document.getElementById('suit').innerText = '化木 '
  }
  if (enableLuanJi) {
    luanJi = new Set()
    document.getElementById('iframe-source').contentWindow.document.getElementById('suit').innerText = '乱击 '
  }
}

function calcResult() {
  combos = []
  arr.sort()
  findCombos(arr)
}

function findCombos(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    printCombination(arr, arr.length, i)
  }
  findPairs()
}

function printCombination(arr, n, r) {
  // A temporary array to store all combination one by one
  var data = []
  // Print all combination using temporary array 'data'
  combinationUtil(arr, n, r, 0, data, 0)
}

/*
   arr[]  ---> Input Array
   n      ---> Size of input array
   r      ---> Size of a combination to be printed
   index  ---> Current index in data[]
   data[] ---> Temporary array to store current combination
   i      ---> index of current element in arr[]
*/
function combinationUtil(arr, n, r, index, data, i) {
  // Current combination is ready, print it
  if (index === r) {
    //make combo array local and insert sum
    var insertable = []
    for (var i = 0; i < data.length; i++) {
      insertable.push(data[i])
    }
    combos.push(insertable)
    return
  }
  // When no more elements are there to put in data[]
  if (i >= n) {
    return
  }
  // current is included, put next at next location
  data[index] = arr[i]
  combinationUtil(arr, n, r, index + 1, data, i + 1)
  // current is excluded, replace it with next
  // (Note that i+1 is passed, but index is not
  // changed)
  combinationUtil(arr, n, r, index, data, i + 1)
}

function findPairs() {
  var pairs = []
  for (var i = 0; i < combos.length; i++) {
    for (var j = i + 1; j < combos.length; j++) {
      if (sum(combos[i]) === sum(combos[j])) {
        var pair1 = combos[i]
        var pair2 = combos[j]
        var concat = pair1.concat(pair2).sort()
        var origin = arr.sort()
        var is_same =
          concat.length === origin.length &&
          concat.every(function (element, index) {
            return element === origin[index]
          })

        var b = 0,
          c = 0,
          cIndex = 0,
          is_subarray = false
        // Traverse both arrays simultaneously
        while (b < origin.length && c < concat.length) {
          // If element matches, increment both pointers
          if (origin[b] === concat[c]) {
            b++
            c++
            cIndex++
            // If concat array is completely traversed
            if (c === concat.length) {
              // console.log("is_subarray set to true");
              is_subarray = true
            }
          } else {
            if (origin[b] !== concat[cIndex]) {
              //fix when having duplicates of same value
              b++
            }
            c = cIndex
          }
        }
        // console.log("is_subarrray?: " + is_subarray);
        if (is_same || is_subarray) {
          pairs.push(toLetter(combos[i]).join('+') + ' = ' + toLetter(combos[j]).join('+'))
        }
      }
    }
  }
  if (pairs.length === 0) {
    document.getElementById('iframe-source').contentWindow.document.getElementById('res').innerHTML = "<span style='color: red'>无结果!</span>"
    console.warn('无结果')
    return
  }

  var sortedPairs = pairs.sort(function (a, b) {
    if (b.length !== a.length) {
      // sort by length
      return b.length - a.length
    } else {
      // 尽量2组平均分配
      return Math.abs(parseInt(b.length / 2) - a.indexOf('=')) - Math.abs(parseInt(b.length / 2) - b.indexOf('='))
    }
  })
  var filteredPairs = []
  sortedPairs.filter(function (value, index, array) {
    if (!containsStr(filteredPairs, value)) {
      filteredPairs.push(value)
    }
  })
  if (filteredPairs.length > 3) {
    filteredPairs = filteredPairs.slice(0, 3)
  }
  drawYanJiao(filteredPairs)
}

function drawYanJiao(filteredPairs) {
  var YanJiaoResHTML = document.getElementById('iframe-source').contentWindow.document.getElementById('res')
  YanJiaoResHTML.innerText = ''
  for (let sebs of filteredPairs) {
    let span = document.createElement('button')
    span.className = 'calRes'
    span.innerText = sebs
    span.onmousedown = function () {
      toClipboard(sebs)
      span.innerText = '复制成功'
      setTimeout(() => {
        span.textContent = sebs
      }, '500')
    }
    YanJiaoResHTML.append(span)

    var br = document.createElement('br')
    YanJiaoResHTML.append(br)
  }
}

function containsStr(arr, str) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === str) {
      return true
    }
  }
  return false
}

function transformLetter(num) {
  switch (num) {
    case 11:
      return 'J'
    case 12:
      return 'Q'
    case 13:
      return 'K'
    default:
      return num
  }
}

function toLetter(combo) {
  var toLetter = []
  for (var i = 0; i < combo.length; i++) {
    toLetter.push(transformLetter(combo[i]))
  }
  return toLetter
}

function sum(arr) {
  var sum = 0
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

function getCardNumAndSuit(cardID) {
  let cardNum = currentMode[cardID]['number']
  let cardSuit = ''
  let cardNumAndSuit = ''
  let cardNumAJQK = ''

  if (currentMode[cardID]['color'] == 1) {
    cardSuit = '♥'
  } else if (currentMode[cardID]['color'] == 2) {
    cardSuit = '♦'
  } else if (currentMode[cardID]['color'] == 3) {
    cardSuit = '♠'
  } else if (currentMode[cardID]['color'] == 4) {
    cardSuit = '♣'
  }

  if (cardNum == 12) {
    cardNumAJQK = 'Q'
  } else if (cardNum == 13) {
    cardNumAJQK = 'K'
  } else if (cardNum == 11) {
    cardNumAJQK = 'J'
  } else if (cardNum == 1) {
    cardNumAJQK = 'A'
  } else {
    cardNumAJQK = cardNum
  }
  cardNumAndSuit = cardSuit + cardNumAJQK

  let res = { cardNumAndSuit: cardNumAndSuit, cardNum: cardNum, cardSuit: cardSuit }
  return res
}
//ToZone
function addCard(id, cardID, zone, ToPosition, SpellID) {
  //观星询询翻回牌堆,牌堆增加,cardType增加
  //65280 丢到牌堆顶
  if (zone == 1 && id == 255 && ToPosition == 65280 && cardID != 4400 && cardID != 4401 && SpellID != 3208 && SpellID != 3266) {
    paidui.add(cardID)
    addCardType(cardID)
    ding.push(cardID)
    console.warn('card ding ' + ding)
  }
  //0 丢到牌堆底
  else if (zone == 1 && id == 255 && ToPosition == 0 && SpellID != 3218) {
    paidui.add(cardID)
    addCardType(cardID)
    di.push(cardID)
    console.warn('card di ' + di)
  }
  //黄承彦技能，伏间
  else if (zone == 1 && id == 255 && SpellID == 987) {
    paidui.add(cardID)
    addCardType(cardID)
    ding.splice(insertInd, 0, cardID)
    // ding.reverse();
    console.warn('card ding 黄承彦 ' + ding + ' ' + insertInd)
  }
  //用手气卡把手牌丢回给牌堆
  else if (zone == 1 && id == 0) {
    addCardType(cardID)
  } else if (zone == 2) {
    qipai.add(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    remShouPai.delete(cardID)
    //吕蒙博图
    //console.warn(getCardNumAndSuit(cardID)["cardSuit"])
    if (enableBoTu) {
      addSuit(cardID)
    }
  } else if (zone == 3) {
    chuli.add(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    remShouPai.delete(cardID)
  } else if (zone == 4) {
    biaoji[id].push(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    remShouPai.delete(cardID)
  } else if (zone == 5) {
    //周妃/徐盛
    if (SpellID == 414 || SpellID == 3178) {
      cardID = unknownCard.splice(-1, 1)[0]
    }
    if (typeof cardID != 'undefined' && typeof shoupai[idOrder[id]] != 'undefined') {
      isDuanXian = false
      shoupai[idOrder[id]].add(cardID)
      if (paidui.delete(cardID)) {
        removeCardType(cardID)
      }
    } else {
      isDuanXian = true
    }
    remShouPai.delete(cardID)
  } else if (zone == 6) {
    zhuangbei[id].push(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    remShouPai.delete(cardID)
  } else if (zone == 7) {
    panding[id].push(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    remShouPai.delete(cardID)
  } else if (zone == 8) {
    jineng.add(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    remShouPai.delete(cardID)
  } else if (zone == 9) {
    return '洗牌'
  } else if (zone == 10) {
    zone10.add(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    remShouPai.delete(cardID)
  } else {
    console.warn('card.ToZone: ' + zone + ' id: ' + id + 'cardID' + cardID)
  }
  //出现在别的区域，清除此牌
  if (zone != 5) {
    for (let i = 0; i < idOrderPre.length; i++) {
      shoupai[i].delete(cardID)
    }
  }
}

//FromZone
function removeCard(id, cardID, zone, FromPosition) {
  //id = 0,zone 1 游戏开始发牌
  if (zone == 1 && id == 0) {
    return '游戏开始发牌'
  }
  //破黄承彦 记录index 用于导入这张牌到ding 伏间
  else if (zone == 0 && id == 0 && FromPosition == 0) {
    let index = ding.indexOf(cardID)
    if (index != -1) {
      insertInd = index
    }
  }
  //系统直接从牌堆发装备--绝响
  //从牌堆发牌,牌堆删除这个id,cardType减少
  // 从牌堆顶发牌
  else if (zone == 1 && id == 255 && FromPosition == 65280) {
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    if (cardID != 0 && ding.indexOf(cardID) != -1) {
      ding.splice(ding.indexOf(cardID), 1)
    } else if (ding.indexOf(cardID) == -1 && ding.indexOf(0) != -1) {
      ding.splice(ding.indexOf(0), 1)
    }
  } else if (zone == 1 && id == 255 && FromPosition == 0) {
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    if (cardID != 0 && di.indexOf(cardID) != -1) {
      di.splice(di.indexOf(cardID), 1)
    } else if (di.indexOf(cardID) == -1 && di.indexOf(0) != -1) {
      di.splice(di.indexOf(0), 1)
    }
  }
  // 猜测65282是处理区
  else if (zone == 1 && id == 255 && FromPosition == 65282) {
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
    if (cardID != 0) {
      let index = ding.indexOf(cardID)
      if (index != -1) {
        ding.splice(index, 1)
        insertInd = index
      } else if (index == -1 && ding.indexOf(0) != -1) {
        ding.splice(index, 1)
        insertInd = -1
      }
    }
  }
  //从弃牌堆丢牌
  else if (zone == 2) {
    qipai.delete(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
  }
  //从处理区丢牌
  else if (zone == 3) {
    chuli.delete(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
  }
  //从标记区丢牌
  else if (zone == 4) {
    if (typeof biaoji[id] != 'undefined') {
      isDuanXian = false
      if (paidui.delete(cardID)) {
        removeCardType(cardID)
      }
      let index = biaoji[id].indexOf(cardID)
      if (index == -1) {
        cardID = 0
        index = biaoji[id].indexOf(cardID)
      }
      unknownCard.push(biaoji[id].splice(index, 1)[0])
    } else {
      isDuanXian = true
    }
  } else if (zone == 5) {
    if (typeof shoupai[idOrder[id]] != 'undefined') {
      isDuanXian = false

      for (let i = 0; i < idOrderPre.length; i++) {
        shoupai[i].delete(cardID)
      }
      if (paidui.delete(cardID)) {
        removeCardType(cardID)
      }
    } else {
      isDuanXian = true
    }
  }
  //装备区丢牌
  else if (zone == 6) {
    if (typeof zhuangbei[id] != 'undefined') {
      isDuanXian = false
      let index = zhuangbei[id].indexOf(cardID)
      if (index == -1) {
        let cardID = 0
        index = zhuangbei[id].indexOf(cardID)
      }
      zhuangbei[id].splice(index, 1)
      if (paidui.delete(cardID)) {
        removeCardType(cardID)
      }
    } else {
      isDuanXian = true
    }
  }
  //判定
  else if (zone == 7) {
    if (typeof panding[id] != 'undefined') {
      let index = panding[id].indexOf(cardID)
      if (index == -1) {
        let cardID = 0
        index = panding[id].indexOf(cardID)
      }
      panding[id].splice(index, 1)
      if (paidui.delete(cardID)) {
        removeCardType(cardID)
      }
    } else {
      isDuanXian = true
    }
  } else if (zone == 8) {
    jineng.delete(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
  } else if (zone == 9) {
    return '洗牌'
  } else if (zone == 10) {
    zone10.delete(cardID)
    if (paidui.delete(cardID)) {
      removeCardType(cardID)
    }
  } else {
    console.warn('card.remove: ' + zone + ' id: ' + id + 'cardID' + cardID)
  }
  remShouPai.delete(cardID)
  // return cardID;
}

function removeCardType(cardID) {
  if (cardID != 0) {
    console.warn('card type remove: ' + cardID + currentMode[cardID]['cardName'] + ' ' + JSON.stringify(getCardNumAndSuit(cardID)))
    if (typeof currentCardType[currentMode[cardID]['cardName']] != 'undefined') {
      let n = currentCardType[currentMode[cardID]['cardName']]['cardNum']
      if (n > 0) {
        n--
        currentCardType[currentMode[cardID]['cardName']]['cardNum'] = n
        if (n == 1) {
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).disabled = false
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).innerText = currentMode[cardID]['cardName']
        } else if (n == 0) {
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).innerText = currentMode[cardID]['cardName']
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).disabled = true
        } else {
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).innerText = n + currentMode[cardID]['cardName']
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).disabled = false
        }
      }
      if (getCardNumAndSuit(cardID)['cardSuit'] == '♦') {
        diamond--
      } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♣') {
        club--
      } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♠') {
        spade--
      } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♥') {
        heart--
      }
      if ((getCardNumAndSuit(cardID)['cardSuit'] == '♥' || getCardNumAndSuit(cardID)['cardSuit'] == '♦') && (currentMode[cardID]['cardName'] == '火杀' || currentMode[cardID]['cardName'] == '雷杀' || currentMode[cardID]['cardName'] == '杀')) {
        hongsha--
      } else if ((getCardNumAndSuit(cardID)['cardSuit'] == '♣' || getCardNumAndSuit(cardID)['cardSuit'] == '♠') && (currentMode[cardID]['cardName'] == '火杀' || currentMode[cardID]['cardName'] == '雷杀' || currentMode[cardID]['cardName'] == '杀')) {
        heisha--
      }
      if (diamond < 0) {
        diamond = 0
      } else if (heart < 0) {
        heart = 0
      } else if (club < 0) {
        club = 0
      } else if (diamond < 0) {
        diamond = 0
      } else if (spade < 0) {
        spade = 0
      } else if (hongsha < 0) {
        hongsha = 0
      } else if (heisha < 0) {
        heisha = 0
      } else if (diamond < 0) {
        diamond = 0
      }

      document.getElementById('iframe-source').contentWindow.document.getElementById('heart').innerText = '♥红桃 × ' + heart
      document.getElementById('iframe-source').contentWindow.document.getElementById('club').innerText = '♣梅花 × ' + club
      document.getElementById('iframe-source').contentWindow.document.getElementById('spade').innerText = '♠黑桃 × ' + spade
      document.getElementById('iframe-source').contentWindow.document.getElementById('diamond').innerText = '♦方片 × ' + diamond
      // document.getElementById('iframe-source').contentWindow.document.getElementById("shandian").innerText ="♠黑桃2~9 概率:"+ Math.round((spade2_9 / paidui.size) * 100)+'%';
      document.getElementById('iframe-source').contentWindow.document.getElementById('hongsha').innerText = '红杀 × ' + hongsha
      document.getElementById('iframe-source').contentWindow.document.getElementById('heisha').innerText = '黑杀 × ' + heisha
    }
  }
}

function addCardType(cardID) {
  if (cardID != 0) {
    console.warn('card type add: ' + cardID + currentMode[cardID]['cardName'] + ' ' + JSON.stringify(getCardNumAndSuit(cardID)))
    if (typeof currentCardType[currentMode[cardID]['cardName']] != 'undefined') {
      let n = currentCardType[currentMode[cardID]['cardName']]['cardNum']
      if (n >= 0) {
        n++
        currentCardType[currentMode[cardID]['cardName']]['cardNum'] = n
        if (n == 1) {
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).disabled = false
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).innerText = currentMode[cardID]['cardName']
        } else if (n == 0) {
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).innerText = currentMode[cardID]['cardName']
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).disabled = true
        } else {
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).innerText = n + currentMode[cardID]['cardName']
          document.getElementById('iframe-source').contentWindow.document.getElementById(currentMode[cardID]['cardName']).disabled = false
        }
      }
      if (getCardNumAndSuit(cardID)['cardSuit'] == '♦') {
        diamond++
      } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♣') {
        club++
      } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♠') {
        spade++
      } else if (getCardNumAndSuit(cardID)['cardSuit'] == '♥') {
        heart++
      }
      if ((getCardNumAndSuit(cardID)['cardSuit'] == '♥' || getCardNumAndSuit(cardID)['cardSuit'] == '♦') && (currentMode[cardID]['cardName'] == '火杀' || currentMode[cardID]['cardName'] == '雷杀' || currentMode[cardID]['cardName'] == '杀')) {
        hongsha++
      } else if ((getCardNumAndSuit(cardID)['cardSuit'] == '♣' || getCardNumAndSuit(cardID)['cardSuit'] == '♠') && (currentMode[cardID]['cardName'] == '火杀' || currentMode[cardID]['cardName'] == '雷杀' || currentMode[cardID]['cardName'] == '杀')) {
        heisha++
      }
      if (getCardNumAndSuit(cardID)['cardSuit'] == '♠' && getCardNumAndSuit(cardID)['cardNum'] >= 2 && getCardNumAndSuit(cardID)['cardNum'] <= 9) {
        spade2_9++
      }
      document.getElementById('iframe-source').contentWindow.document.getElementById('heart').innerText = '♥红桃 × ' + heart
      document.getElementById('iframe-source').contentWindow.document.getElementById('club').innerText = '♣梅花 × ' + club
      document.getElementById('iframe-source').contentWindow.document.getElementById('spade').innerText = '♠黑桃 × ' + spade
      document.getElementById('iframe-source').contentWindow.document.getElementById('diamond').innerText = '♦方片 × ' + diamond
      // document.getElementById('iframe-source').contentWindow.document.getElementById("shandian").innerText ="♠黑桃2~9 概率:"+ (spade2_9/paidui.size).toFixed(2);
      //document.getElementById('iframe-source').contentWindow.document.getElementById("paiduiSize").innerText ="牌堆张数: "+ paidui.size;
      document.getElementById('iframe-source').contentWindow.document.getElementById('hongsha').innerText = '红杀 × ' + hongsha
      document.getElementById('iframe-source').contentWindow.document.getElementById('heisha').innerText = '黑杀 × ' + heisha
    }
  }
}

function getSeatOrder(ToID, ToZone, CardIDs, className, seatID) {
  if (!isSeatOrder && idOrder[ToID] == -1 && ToZone == 5) {
    if (typeof CardIDs[0] != 'undefined' && CardIDs[0] != 0) {
      mainID = ToID
      mySeatID.add(mainID)
    }
  }
  if (className == 'GsCFirstPhaseRole' && typeof seatID != 'undefined') {
    firstSeatID = seatID
    seat = 0
    console.warn('card first seat ID' + seatID)
  }
}

function mainLogic(args) {
  let className = args['className']
  card.CardIDs = args['CardIDs']
  card.CardID = args['CardID']
  card.FromID = args['FromID']
  card.FromZone = args['FromZone']
  card.ToID = args['ToID']
  card.ToZone = args['ToZone']
  card.CardCount = args['CardCount']
  card.DataCount = args['DataCount']
  card.SpellID = args['SpellID'] //使用的技能
  card.FromPosition = args['FromPosition']
  card.ToPosition = args['ToPosition']
  var cardCount = args['cardCount']
  var cardList = args['CardList']
  let cardID = 0
  var firstID = args['SeatID']
  var Param = args['Param']
  var Params = args['Params']
  let ClientID = args['ClientID']
  DestSeatIDs = args['DestSeatIDs']
  var GeneralSkinList = args['GeneralSkinList']
  var Infos = args['Infos']
  var Cards = args['Cards']
  var targetSeatID = args['targetSeatID']
  var seatId = args['seatId']
  var SeatID = args['SeatID']
  var Round = args['Round']
  curUserID = args['curUserID']

  //博图，用于检测什么适合清空博图花色
  if (className == 'GsCGamephaseNtf' && Round == 0 && (enableBoTu || enableLuanJi || enableQuanBian)) {
    clearSuit()
  }

  if (className == 'GsCModifyUserseatNtf') {
    size = Infos['length']
    console.warn('card renshu' + size)
    for (let info of Infos) {
      if (info['ClientID'] < 4200000000) {
        firstSeatID = info['SeatID']
      }
    }
  }
  if (className == 'MsgReconnectGame') {
    isDuanXian = true
  }
  if (className == 'MsgGamePlayCardNtf') {
    isJunZhengBiaoZhun = false
    isJunZhengYingBian = false
    isHuanLeBiaoZhun = false
    isJunZhengBiaoZhunShanShan = false
    isJunZhengYingBianShanShan = false
    isHuanLeBiaoZhunShanShan = false
    isShenZhiShiLian = false

    isGuoZhanBiaoZhun = false
    isGuoZhanYingBian = false

    isZhuGongSha = false
    isZhuGongShaShanShan = false
    isDouDiZhu = false

    if (cardCount == 161 && cardList[160] == 12142) {
      isJunZhengBiaoZhunShanShan = true
      currentCardType = cardTypeJunZhengBiaoZhun
      currentMode = JunZhengBiaoZhunShanShan
    }
    if (cardCount == 161 && cardList[160] == 161) {
      isJunZhengBiaoZhun = true
      currentCardType = cardTypeJunZhengBiaoZhun
      currentMode = JunZhengBiaoZhun
    } else if (cardCount == 160 && cardList[159] == 160) {
      isHuanLeBiaoZhun = true
      currentCardType = cardTypeHuanLeBiaoZhun
      currentMode = HuanLeBiaoZhun
    } else if (cardCount == 160 && cardList[159] == 12142) {
      isHuanLeBiaoZhunShanShan = true
      currentCardType = cardTypeHuanLeBiaoZhun
      currentMode = HuanLeBiaoZhunShanShan
    } else if (cardCount == 166 && cardList[165] == 13005) {
      isDouDiZhu = true
      currentCardType = cardTypeDouDiZhu
      currentMode = DouDiZhu
    } else if (cardCount == 110 && cardList[107] == 1108) {
      isGuoZhanBiaoZhun = true
      currentCardType = cardTypeGuoZhanBiaoZhun
      currentMode = GuoZhanBiaoZhun
    } else if (cardCount == 161 && cardList[160] == 7160) {
      isJunZhengYingBian = true
      currentCardType = cardTypeJunZhengYingBian
      currentMode = JunZhengYingBian
    } else if (cardCount == 164 && cardList[160] == 7160) {
      isJunZhengYingBian = true
      currentCardType = cardTypeJunZhengYingBian
      currentMode = JunZhengYingBianShanShan
    } else if (cardCount == 162 && cardList[1] == 201) {
      isShenZhiShiLian = true
      currentCardType = cardTypeShenZhiShiLian
      currentMode = ShenZhiShiLian
    } else if (cardCount == 111 && cardList[110] == 20330) {
      isGuoZhanYingBian = true
      currentCardType = cardTypeGuoZhanYingBian
      currentMode = GuoZhanYingBian
    } else if (cardCount == 157 && cardList[156] == 13005) {
      isZhuGongSha = true
      currentCardType = cardTypeZhuGongSha
      currentMode = ZhuGongSha
    } else if (cardCount == 158 && cardList[157] == 13005) {
      isZhuGongShaShanShan = true
      currentCardType = cardTypeZhuGongSha
      currentMode = ZhuGongShaShanShan
    }
    if (isShenZhiShiLian || isJunZhengBiaoZhun || isGuoZhanBiaoZhun || isHuanLeBiaoZhun || isJunZhengYingBian || isGuoZhanYingBian || isTongShuai || isZhuGongSha || isZhuGongShaShanShan || isJunZhengBiaoZhunShanShan || isJunZhengYingBianShanShan || isHuanLeBiaoZhunShanShan || isDouDiZhu) {
      if (!isFrameAdd) {
        addFrame()
      }
      gameStart()
      // resetOrderContainer();
      // hideOrderContainer(size);
      for (let i = 1; i <= 3; i++) {
        clearButton('type' + i)
      }

      addCardTypeButton(currentCardType)
      var elmnt = document.getElementById('createIframe')
      buttonClick()
      initDragElement()
    }
  }

  let cardNumAndSuit
  if ((isShenZhiShiLian || isJunZhengBiaoZhun || isGuoZhanBiaoZhun || isHuanLeBiaoZhun || isJunZhengYingBian || isGuoZhanYingBian || isTongShuai || isZhuGongSha || isZhuGongShaShanShan || isJunZhengBiaoZhunShanShan || isJunZhengYingBianShanShan || isHuanLeBiaoZhunShanShan || isDouDiZhu) && !isDuanXian && !isB) {
    //座位表

    getSeatOrder(card.ToID, card.ToZone, card.CardIDs, className, firstID)

    //spell 记录目标角色 987 988 黄承彦，神甘921 伏间851
    if (className == 'PubGsCUseSpell' && typeof DestSeatIDs != 'undefined' && DestSeatIDs.length > 0 && (card.SpellID == 987 || card.SpellID == 988 || card.SpellID == 921 || card.SpellID == 851)) {
      DestSeatID = DestSeatIDs[0]
    }
    if (className == 'PubGsCUseSpell' && card.SpellID == 3157 && card.CardIDs.length != 0) {
      for (const c of card.CardIDs) {
        shoupai[idOrder[firstID]].add(c)
      }
      drawShouPai(shoupai)
    }
    //徐氏洗牌
    else if (className == 'PubGsCUseSpell' && card.SpellID == 781) {
      paidui.forEach((element) => {
        qipai.add(element)
      })
      paidui = new Set()
      ding = []
      di = []
    }
    //记录国战大嘴乱击花色
    else if (className == 'PubGsCUseCard' && mainID == SeatID && enableQuanBian) {
      addSuit(card.CardID)
    }
    // else if (className == "PubGsCUseCard" && mainID==SeatID &&  enableHuaMu) {
    //     addSuit(card.CardID);
    // }
    else if (className == 'PubGsCUseSpell' && card.SpellID == 2143) {
      for (const c of card.CardIDs) {
        addSuit(c)
      }
    }
    //什么傻叉昭然，用的欢乐成双的class不用欢乐成双的ui和代码逻辑
    else if (className == 'ClientHappyGetFriendHandcardRep') {
      for (const c of Cards) {
        if (typeof idOrder[seatId] != 'undefined') {
          shoupai[idOrder[seatId]].add(c)
        }
      }
      drawShouPai(shoupai)
    }
    //包含目标角色和自己的全部手牌，用已经记录的目标角色排除，加入目标角色全部手牌 黄承彦
    else if (className == 'GsCRoleOptTargetNtf' && typeof Params != 'undefined' && Param == 1 && (card.SpellID == 987 || card.SpellID == 988)) {
      // Params: (9) [5, 2, 63, 138, 60, 118, 153, 28, 20]
      let shoupaiSize = Params[1]
      if (typeof DestSeatID != 'undefined') {
        for (let p = Params.length - 1; p > Params.length - 1 - shoupaiSize; p--) {
          shoupai[idOrder[DestSeatID]].add(Params[p])
        }
      }
      drawShouPai(shoupai)
    }
    //族钟琰
    else if (className == 'GsCRoleOptTargetNtf' && typeof Params != 'undefined' && targetSeatID == 255 && Param == 0 && card.SpellID == 3266) {
      for (const p of Params.slice().reverse()) {
        paidui.add(p)
        addCardType(p)
        ding.push(p)
        console.warn('card ding ' + ding)
      }
    } else if (className == 'GsCRoleOptTargetNtf' && typeof Params != 'undefined' && targetSeatID != 255 && Param == 0 && card.SpellID == 3266) {
      if (typeof targetSeatID != 'undefined') {
        for (let p = Params.length - 1; p >= 0; p--) {
          shoupai[idOrder[targetSeatID]].add(Params[p])
        }
      }
      drawShouPai(shoupai)
    }
    //溃围
    else if (className == 'GsCRoleOptTargetNtf' && typeof Params != 'undefined' && card.SpellID == 372) {
      // Params: (9) [5, 2, 63, 138, 60, 118, 153, 28, 20]

      if (typeof targetSeatID != 'undefined') {
        for (let p = Params.length - 1; p >= 0; p--) {
          shoupai[idOrder[targetSeatID]].add(Params[p])
        }
      }
      drawShouPai(shoupai)
    }

    //神甘宁 伏间 目标角色手牌
    else if (className == 'GsCRoleOptTargetNtf' && typeof Params != 'undefined' && Param == 0 && (card.SpellID == 921 || card.SpellID == 851)) {
      //Param: 0
      // Params: (4) [101, 52, 143, 26]
      // SeatID: 5
      // SpellID: 921
      // SrcSeatID: 5
      // Timeout: 10
      if (typeof DestSeatID != 'undefined') {
        for (const p in Params) {
          shoupai[idOrder[DestSeatID]].add(Params[p])
        }
      }
      drawShouPai(shoupai)
    }
    //贿生 闪袭 勘破目标角色手牌
    else if (className == 'GsCRoleOptTargetNtf' && typeof Params != 'undefined' && Param == 0 && (card.SpellID == 361 || card.SpellID == 774 || card.SpellID == 357 || card.SpellID == 811)) {
      if (typeof targetSeatID != 'undefined') {
        for (let p = Params.length - 1; p >= 0; p--) {
          shoupai[idOrder[targetSeatID]].add(Params[p])
        }
      }
      drawShouPai(shoupai)
    }
    //邓忠，改你妹啊
    else if (className == 'GsCRoleOptTargetNtf' && typeof Params != 'undefined' && (card.SpellID == 3119 || card.SpellID == 501)) {
      if (typeof targetSeatID != 'undefined') {
        for (let p = Params.length - 1; p >= 0; p--) {
          shoupai[idOrder[targetSeatID]].add(Params[p])
        }
      }
      drawShouPai(shoupai)
    } else if (className == 'PubGsCMoveCard' && typeof card.CardCount != 'undefined' && card.CardCount > 0) {
      //游戏开始后 洗牌，会从弃牌堆2丢到洗牌堆
      if (card.FromZone == 2 && card.ToZone == 9 && card.FromID == 0 && card.ToID == 0 && isGameStart) {
        ding = []
        di = []
        remCardCount = card.CardCount
        remShouPai = paidui
        drawRemShouPai(remShouPai)
        paidui = qipai
        qipai = new Set()
        if (isJunZhengBiaoZhun) {
          for (let i = 1; i <= 161; i++) {
            removeCardType(i)
          }
        } else if (isGuoZhanBiaoZhun) {
          for (let i = 1001; i <= 1108; i++) {
            removeCardType(i)
          }
          removeCardType(1150)
          removeCardType(1148)
        } else if (isGuoZhanYingBian) {
          for (let i = 1200; i <= 1307; i++) {
            removeCardType(i)
          }
          removeCardType(1150)
          removeCardType(1148)
          removeCardType(20330)
        } else if (isHuanLeBiaoZhun) {
          for (let i = 1; i <= 160; i++) {
            removeCardType(i)
          }
        } else if (isDouDiZhu) {
          for (let i = 1; i <= 160; i++) {
            removeCardType(i)
          }
          for (let i = 13000; i <= 13005; i++) {
            removeCardType(i)
          }
        } else if (isHuanLeBiaoZhunShanShan) {
          for (let i = 1; i <= 160; i++) {
            removeCardType(i)
          }
        } else if (isJunZhengYingBian) {
          for (let i = 7001; i <= 7160; i++) {
            removeCardType(i)
          }
          removeCardType(161)
        } else if (isShenZhiShiLian) {
          for (let i = 7001; i <= 7160; i++) {
            removeCardType(i)
          }
          removeCardType(161)
          removeCardType(201)
        }
        if (isZhuGongSha) {
          for (let i = 1; i <= 14; i++) {
            removeCardType(i)
          }
          for (let i = 17; i <= 31; i++) {
            removeCardType(i)
          }
          for (let i = 33; i <= 70; i++) {
            removeCardType(i)
          }
          for (let i = 72; i <= 143; i++) {
            removeCardType(i)
          }
          for (let i = 145; i <= 160; i++) {
            removeCardType(i)
          }
          for (let i = 13000; i <= 13005; i++) {
            removeCardType(i)
          }
        }
        if (isZhuGongShaShanShan) {
          for (let i = 1; i <= 14; i++) {
            removeCardType(i)
          }
          for (let i = 17; i <= 31; i++) {
            removeCardType(i)
          }
          for (let i = 33; i <= 70; i++) {
            removeCardType(i)
          }
          for (let i = 72; i <= 143; i++) {
            removeCardType(i)
          }
          for (let i = 145; i <= 160; i++) {
            removeCardType(i)
          }
          for (let i = 12140; i <= 12142; i++) {
            removeCardType(i)
          }
          for (let i = 13000; i <= 13005; i++) {
            removeCardType(i)
          }
        }
        hongsha = 0
        heisha = 0
        diamond = 0
        heart = 0
        club = 0
        diamond = 0
        spade = 0
        hongsha = 0
        heisha = 0
        diamond = 0
        paidui.forEach((element) => {
          addCardType(element)
        })
      }
      //游戏开始 弃牌堆2丢到洗牌堆
      else if (card.FromZone == 2 && card.ToZone == 9 && card.FromID == 0 && card.ToID == 0 && !isGameStart) {
        remCardCount = card.CardCount
        resetOrderContainer()
        if (isZhuGongSha) {
          hideOrderContainer(5)
        } else if (isZhuGongShaShanShan) {
          hideOrderContainer(5)
        } else {
          hideOrderContainer(size)
        }
        console.warn('游戏开始,发牌')
      }
      //第一次发牌+手气卡拿牌 对自己手牌和cardType 和paidui 产生影响
      else if (card.ToZone == 5 && card.FromID == 255 && card.FromZone == 1 && !isGameStart) {
        //重复用手气卡不会添加 但是手牌会更新
        remCardCount -= card.CardCount
        if (!idOrderPreSet.has(card.ToID)) {
          idOrderPreSet.add(card.ToID)
          idOrderPre.push(card.ToID)
          console.warn('card idOrderPre ' + JSON.stringify(idOrderPre))
        }
        if (typeof card.CardIDs[0] != 'undefined' && card.CardIDs[0] != 0) {
          mainID = card.ToID
          mySeatID.add(mainID)
        }
        for (let i = 0; i < card.CardCount; i++) {
          if (card.CardIDs.length != 0) {
            cardID = card.CardIDs[i]
            shoupai[card.ToID].add(cardID)
            removeCardType(cardID)
            paidui.delete(cardID)
            console.warn('card shouqika/fapai shoupai[id]' + paidui.size + shoupai)
          }
        }
      }
      //手气卡丢牌
      else if (card.FromZone == 5 && card.FromID == mainID && card.ToZone == 1 && card.ToID == 0 && !isGameStart) {
        remCardCount += card.CardCount
        shoupai[card.FromID] = new Set()
        for (let i = 0; i < card.CardCount; i++) {
          if (card.CardIDs.length != 0) {
            cardID = card.CardIDs[i]
          }
          addCardType(cardID)
          paidui.add(cardID)
        }
        console.warn('card 手气卡丢牌 ' + JSON.stringify(shoupai))
      }
      // 或者有其他操作,则说明游戏开始
      //不点手气卡,摸牌,也会进入这里
      else {
        isGameStart = true
        if (!isSeatOrder) {
          if (isDouDiZhu) {
            firstSeatID = idOrderPre[0]
          }
          let ind = idOrderPre.indexOf(firstSeatID)
          for (let i = 0; i < idOrderPre.length; i++) {
            newIdOrder[idOrderPre[ind % idOrderPre.length]] = seat
            newShouPai[seat] = shoupai[idOrderPre[ind % idOrderPre.length]]
            seat++
            ind++
          }
          idOrder = newIdOrder
          shoupai = newShouPai
          isSeatOrder = true
          console.warn('card reOrder shoupai: ' + JSON.stringify(shoupai))
          console.warn('card reOrder seat info: ' + JSON.stringify(idOrder))
        }
      }
      //游戏开始
      if (isGameStart) {
        //单独适配,别人暗的已知手牌全部给一个人的情况，例如自己不是刘备，刘备有已知手牌，但是全部给一个人，三国杀代码是暗牌0
        //如果刘备有两张牌，一张明牌，一张给a，一张给b，都给到手牌，之后出现再删掉
        if (card.FromZone == 5 && card.ToZone == 5 && card.FromID != card.ToID && card.CardCount >= shoupai[idOrder[card.FromID]].size && card.DataCount == 0) {
          temShouPai = new Set()
          if (shoupai[idOrder[card.FromID]].size != 0) {
            temShouPai = shoupai[idOrder[card.FromID]]
          }
          if (temShouPai.size != 0) {
            for (const c of temShouPai) {
              shoupai[idOrder[card.ToID]].add(c)
            }
            shoupai[idOrder[card.FromID]] = new Set()
          }
        }
        //单独适配,鲁芝清忠，暗的已知手牌全部给一个人的情况，例如鲁芝有已知手牌，但是全部给一个人，三国杀代码是暗牌0
        // 缔盟 清忠
        if (card.FromZone == 10 && card.FromID != card.ToID && card.ToPosition == 65280 && card.FromPosition == 65282 && card.ToZone == 5 && (card.SpellID == 3036 || card.SpellID == 799 || card.SpellID == 121)) {
          //只需要换一次，清忠缔盟会有两次，第一次赋值之后就不需要再换了
          isDiMeng = !isDiMeng
          if (isDiMeng) {
            temShouPai = shoupai[idOrder[card.ToID]]
            shoupai[idOrder[card.ToID]] = shoupai[idOrder[card.FromID]]
            shoupai[idOrder[card.FromID]] = temShouPai
          }
        }
        //尝试解决最后的手牌
        if (card.FromZone == 5 && card.FromID != card.ToID && card.CardCount >= shoupai[idOrder[card.FromID]].size && card.DataCount == 0) {
          shoupai[idOrder[card.FromID]] = new Set()
        }

        for (let i = 0; i < card.CardCount; i++) {
          if (card.CardIDs.length != 0) {
            cardID = card.CardIDs[i]
          } else {
            cardID = 0
          }
          var FromID = card.FromID
          var FromZone = card.FromZone
          var ToZone = card.ToZone
          var ToID = card.ToID
          var FromPosition = card.FromPosition
          var ToPosition = card.ToPosition
          if (card.FromZone == 1) {
            remCardCount--
          }
          if (card.ToZone == 1) {
            remCardCount++
          }
          //console.warn(di.length+' '+remCardCount);
          //document.getElementById('iframe-source').contentWindow.document.getElementById("paiduiSize").innerText ="张数: "+ remCardCount;
          //除了控底控顶从牌堆摸的牌，所有不是从牌堆摸的牌全部标为明牌
          // if(FromZone != 1 && ToZone == 5){
          //
          // }

          //从牌堆出发，到其他区域，判断顶/底
          //从顶摸牌 已经到底了
          if (FromID == 255 && FromZone == 1 && FromPosition == 65280 && di.length != 0 && remCardCount == di.length) {
            ding = di.reverse()
            di = []
          }
          //顶
          if (FromID == 255 && FromZone == 1 && FromPosition == 65280 && ding.length != 0 && cardID == 0) {
            cardID = ding.pop()
            console.warn('card 顶 pop ' + cardID)
          }

          //底
          if (FromID == 255 && FromZone == 1 && FromPosition == 0 && di.length != 0 && cardID == 0) {
            cardID = di.pop()
            console.warn('card 底 pop ' + cardID)
          }
          removeCard(FromID, cardID, FromZone, FromPosition)
          addCard(ToID, cardID, ToZone, ToPosition, card.SpellID)
        }
      }

      //黄承彦晋司马技能看的牌堆顶是queue不是stack，单独适配ding
      //if(card.FromZone == 1 && card.FromID == 255 && card.ToZone == 1 && card.ToID == 255 && typeof (card.SpellID) != 'undefined' && (card.SpellID == 987)){ding;}
      //严教
      if (card.FromZone == 1 && card.FromID == 255 && card.ToZone == 3 && card.ToID == 255 && typeof card.SpellID != 'undefined' && card.SpellID == 945) {
        arr = []
        card.CardIDs.forEach((cardID) => arr.push(parseInt(getCardNumAndSuit(cardID)['cardNum'])))
        calcResult()
      }
      if (card.FromZone == 1 && card.FromID == 255 && card.ToZone == 8 && card.ToID == 255 && typeof card.SpellID != 'undefined' && card.SpellID == 3033) {
        JiZhanCal(parseInt(getCardNumAndSuit(cardID)['cardNum']))
      }
      //行殇
      if (typeof card.SpellID != 'undefined' && card.SpellID == 105) {
        for (const c of shoupai[idOrder[card.FromID]]) {
          removeCard(card.FromID, c, card.FromZone, card.FromPosition)
          addCard(card.ToID, c, card.ToZone, card.SpellID)
        }
      }

      // console.warn("shoupai"+shoupai);

      drawShouPai(shoupai)
      drawDingOrDi(ding, di)
      if (remShouPai.size != 0) {
        drawRemShouPai(remShouPai)
      } else {
        document.getElementById('iframe-source').contentWindow.document.getElementById('knownCards').innerText = ''
        document.getElementById('iframe-source').contentWindow.document.getElementById('knownCardsInHand').style.display = 'none'
      }
    }
  } else {
    if (document.getElementById('createIframe')) {
      document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>不支持该模式/断线重连</b>'
    }
  }
}

function main() {
  console.info('inject file start!')
  let log = console.log
  console.log = function () {
    let args = Array.prototype.slice.call(arguments)
    log.apply(this, args)

    var mainInfo = {}
    var GeneralSkinList = args[0]['GeneralSkinList']
    let className = args[0]['className']
    let curUserID = args[0]['ClientID']

    if (className == 'ClientLoginIpRep') {
      UserID = args[0]['UserID']
      addSkinFrame() //预先注入
      console.warn('userID' + UserID)
    }

    //enable博图
    // if(className == 'ClientGeneralSkinRep' && GeneralSkinList[0]['GeneralID'] == 306 && curUserID == UserID){
    //     enableBoTu = true;
    // }
    else if (className == 'ClientGeneralSkinRep' && GeneralSkinList[0]['GeneralID'] == 41) {
      enableLuanJi = true
    } else if (className == 'ClientGeneralSkinRep' && GeneralSkinList[0]['GeneralID'] == 7003 && curUserID == UserID) {
      enableQuanBian = true
    }
    // else if(className == 'ClientGeneralSkinRep' && GeneralSkinList[0]['GeneralID'] == 509 && curUserID == UserID){
    //     enableHuaMu = true;
    // }
    //skinLogic start
    //进入游戏先进入这个class，点击皮肤按钮才进入“资源组加载完毕：selectSkin”
    //只适配当前用户的皮肤 && typeof(skinMap[GeneralID])!='undefined'
    // if(className == 'ClientGeneralSkinRep' && curUserID == UserID ){
    //     GeneralID = GeneralSkinList[0]['GeneralID'];
    //     //国战模式
    //     if(isGuoZhanBiaoZhun || isGuoZhanYingBian){
    //         //国战只会换副将，仅仅在需要更新的时候才更新列表避免重复请求
    //         if(GuoZhanGeneral.indexOf(GeneralID) == -1){
    //             if(GuoZhanGeneral.length>=2){GuoZhanGeneral[1] = GeneralID;}
    //             else{GuoZhanGeneral.push(GeneralID);}
    //             updateSkinListGuoZhan(GuoZhanGeneral[0], GuoZhanGeneral[1]);
    //             console.warn('GuoZhanGeneral'+GuoZhanGeneral);
    //         }
    //         isFirstTime = false;
    //     }
    //     else{
    //         if(GeneralID != oldGeneralID && GeneralID!=999){
    //             updateSkinList(GeneralID);
    //             ///999隐匿
    //             if(oldGeneralID==999){mySkin = 0;}
    //             //else{mySkin = (skinMap[GeneralID][skinMap[GeneralID].length-1])*100;}
    //             else{mySkin = GeneralID*100;}
    //             oldGeneralID  = GeneralID;
    //             isFirstTime = true;
    //         }
    //         else{isFirstTime = false;}
    //     }
    //
    //     clickToChangeSkinAndCloseSkinFrame();
    //     if(typeof(mySkin) != 'undefined'){
    //         //国战中两个武将，会出现两个武将的全部皮肤，选一个根据class确定现在的角色， 如果match，则换皮肤
    //         var box = document.getElementById('createSkinIframeSource').contentWindow.document.getElementById(parseInt(mySkin));
    //         //var box = document.getElementById(parseInt(mySkin));
    //         if(box!=null && typeof(box) != 'undefined' && box.classList[1]==GeneralID){
    //             GeneralSkinList[0]["SkinID"] = parseInt(mySkin);
    //         }
    //     }
    //     GeneralSkinList[0]["state"] = 1;
    //     GeneralSkinList[0]["State"] = 1;
    //
    // }
    // if(args == '资源组加载完毕：selectSkin'&& !isFirstTime && document.getElementById('createSkinIframeSource').contentWindow.document.body.innerHTML != ''){
    //     document.getElementById("createSkinIframe").style.display = "inline-block";
    // }
    //skinLogic end
    if (className == 'SsCChatmsgNtf' || className == 'GsCModifyUserseatNtf' || className == 'MsgReconnectGame' || className == 'MsgGamePlayCardNtf' || className == 'PubGsCUseSpell' || className == 'ClientHappyGetFriendHandcardRep' || className == 'GsCRoleOptTargetNtf' || className == 'PubGsCMoveCard' || className == 'GsCFirstPhaseRole' || className == 'GsCModifyUserseatNtf' || className == 'GsCGamephaseNtf' || className == 'PubGsCUseCard') {
      mainInfo['className'] = args[0]['className']
      mainInfo['CardIDs'] = args[0]['CardIDs']
      mainInfo['CardID'] = args[0]['CardID']
      mainInfo['FromID'] = args[0]['FromID']
      mainInfo['FromZone'] = args[0]['FromZone']
      mainInfo['ToID'] = args[0]['ToID']
      mainInfo['ToZone'] = args[0]['ToZone']
      mainInfo['CardCount'] = args[0]['CardCount']
      mainInfo['DataCount'] = args[0]['DataCount']
      mainInfo['SpellID'] = args[0]['SpellID'] //使用的技能
      mainInfo['FromPosition'] = args[0]['FromPosition']
      mainInfo['ToPosition'] = args[0]['ToPosition']
      mainInfo['cardCount'] = args[0]['cardCount']
      mainInfo['CardList'] = args[0]['CardList']
      mainInfo['SeatID'] = args[0]['SeatID']
      mainInfo['Param'] = args[0]['Param']
      mainInfo['Params'] = args[0]['Params']
      mainInfo['DestSeatIDs'] = args[0]['DestSeatIDs']
      //var GeneralSkinList =args[0]["GeneralSkinList"];
      mainInfo['Infos'] = args[0]['Infos']
      mainInfo['Cards'] = args[0]['Cards']
      //var targetSeatID = args[0]["targetSeatID"];
      mainInfo['targetSeatID'] = args[0]['targetSeatID']
      //var seatId = args[0]["seatId"];
      mainInfo['seatId'] = args[0]['seatId']
      mainInfo['SeatID'] = args[0]['SeatID']
      mainInfo['Round'] = args[0]['Round']
      mainInfo['curUserID'] = curUserID
    }

    let mainInfoToMainLogic = JSON.parse(JSON.stringify(mainInfo))

    try {
      mainLogic(mainInfoToMainLogic)
    } catch (e) {
      console.error(e.message)
      console.error(e.stack)
      const [, lineno, colno] = e.stack.match(/(\d+):(\d+)/)
      console.error('Line:', lineno)
      console.error('Column:', colno)
      document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>小抄GG了，联系作者解决</b>'
    }
  }
}
// ----------------------user interface------------------------------------------
var iframe
function clearButton(type) {
  var div = document.getElementById('iframe-source').contentWindow.document.getElementById(type)

  while (div.firstChild) {
    div.removeChild(div.firstChild)
  }
}

function addCardTypeButton(cardType) {
  var toBeAdd
  // for(let i = 1; i<=4 ; i++){
  //     var t = "type"+i;
  //     toBeAdd = document.getElementById('iframe-source').contentWindow.document.getElementById(t);
  //     toBeAdd.append(document.createElement('br'));
  // }
  for (const key in cardType) {
    var type = 'type' + cardType[key]['cardType']
    var button = document.createElement('button')
    toBeAdd = document.getElementById('iframe-source').contentWindow.document.getElementById(type)
    button.id = key
    button.className = 'cardType'
    let n = cardType[key]['cardNum']
    if (n == 1) {
      button.innerText = key
    } else if (n == 0) {
      button.innerText = key
    } else {
      button.innerText = n + key
    }
    // button.innerText = cardType[key]['cardNum']+key;
    toBeAdd.append(button)
  }
}

function drawShouPai(shoupai) {
  var toBeAdd
  for (let i = 0; i < idOrderPre.length; i++) {
    let seatID = (i + 1).toString()
    toBeAdd = document.getElementById('iframe-source').contentWindow.document.getElementById(seatID)
    const shoupaiDIV = document.createElement('div')

    for (const s of shoupai[i]) {
      if (s == '0') {
        continue
      }

      var button = document.createElement('button')
      if (getCardNumAndSuit(s)['cardSuit'] == '♦' || getCardNumAndSuit(s)['cardSuit'] == '♥') {
        button.className = 'shoupaiR' // 红色手牌
      } else {
        button.className = 'shoupai'
      }

      if (knownShouPai.has(s)) {
        button.classList.add('knownShouPai')
      }

      let emojiWrapper = document.createElement('div')
      emojiWrapper.style.width = '100%'
      emojiWrapper.style.textAlign = 'center'

      let emoji = document.createElement('span')
      emoji.style.fontSize = emojiFontSize // 应用可变的字体大小
      emoji.innerText = getCardNumAndSuit(s)['cardNumAndSuit']

      emojiWrapper.appendChild(emoji)
      button.appendChild(emojiWrapper)
      button.innerHTML += currentMode[s]['cardName']
      shoupaiDIV.append(button)
    }

    toBeAdd.innerHTML = shoupaiDIV.innerHTML
  }
}

function addSkinFrame() {
  let createSkinIframe = document.getElementById('createSkinIframe')

  if (!createSkinIframe) {
    createSkinIframe = document.createElement('div')
    createSkinIframe.id = 'createSkinIframe'
    createSkinIframe.className = 'createSkinIframe'
    createSkinIframe.style = '    display: inline-block;' + '    z-index: 10000000000;' + '    display: none;' + '    width: 680px;' + '    height:500px;' + '    position: fixed;' + '    top: 0;' + '    bottom: 0;' + '    left: 0;' + '    right: 20%;' + '    background: rgb(50,50,50);' + '    margin: auto;'

    var header = document.createElement('p')
    header.id = 'header'
    header.className = 'header'
    header.innerText = '请选择皮肤，选中后会自动关闭此窗口，再关闭自身的皮肤窗口即可'
    header.style = 'style:display:inline-block;' + 'margin:1px;' + 'user-select:none;' + 'text-align:center;' + 'color: #f2de9c; ' + 'cursor: pointer'
    var btnSkin = document.createElement('btn')

    btnSkin.innerText = '×'
    btnSkin.id = 'btnSkin'
    btnSkin.style = 'text-align:center;' + 'color: #f2de9c;' + 'background: rgb(40,40,40);' + 'border-radius:5px;' + 'margin-left:3px;' + 'border: 1px solid rgb(212,212,162);' + 'cursor: pointer;' + 'user-select:none;' + 'background: rgb(107,30,30);'
    header.append(btnSkin)
    createSkinIframe.appendChild(header)

    document.body.appendChild(createSkinIframe)

    iframe = document.createElement('iframe')
    iframe.style = 'border: none;' + '    width: 680px;' + '    height:475px;' + 'margin: 0px;' + 'cursor: move;'
    iframe.id = 'createSkinIframeSource'
    iframe.title = 'iframe'

    //iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
    createSkinIframe.append(iframe)
    iframe.contentWindow.document.open()
    iframe.contentWindow.document.write(skinHTML)
    iframe.contentWindow.document.close()
  }
  //skinLogic start
  // var btnSkin = document.getElementById('btnSkin');
  // btnSkin.onmousedown = function (){
  //     document.getElementById("createSkinIframe").style.display = "none"
  // }
  //skinLogic end
}
var skinHTML =
  '<head> ' +
  '        <meta charset=UTF-8> ' +
  '        <style type=text/css> ' +
  '            ::-webkit-scrollbar{width: 5px; height: 12px;} ' +
  '            ::-webkit-scrollbar-track{border: 1px solid rgb(5,5,5);} ' +
  '            ::-webkit-scrollbar-thumb{background: rgb(95,86,63);} ' +
  '            ::-webkit-scrollbar-thumb:hover{background: rgb(44,44,44);} ' +
  '            .skinList { ' +
  '                padding:5px;' +
  '                margin: 2px; ' +
  '                user-select:none;' +
  '            } ' +
  '        </style> ' +
  '    </head> ' +
  '<body>' +
  "<img class = 'skinList' id = '102' src ='https://web.sanguosha.com/220/h5_2/res/runtime/pc/general/seat/static/11211.png' ></img>" +
  "<img class = 'skinList' id = '103' src ='https://web.sanguosha.com/220/h5_2/res/runtime/pc/general/seat/static/12807.png' ></img>" +
  '</body>'
function updateSkinList(generalID) {
  document.getElementById('createSkinIframeSource').contentWindow.document.body.innerHTML = ''
  if (typeof skinMap[generalID] != 'undefined') {
    for (let i = 0; i < skinMap[generalID].length; i++) {
      for (let id = 1; id <= 12; id++) {
        var imgSkin = document.createElement('img')
        imgSkin.id = skinMap[generalID][i] * 100 + id
        imgSkin.className = 'skinList'
        imgSkin.classList.add(generalID)
        imgSkin.src = 'https://web.sanguosha.com/220/h5_2/res/runtime/pc/general/seat/static/' + imgSkin.id + '.png'
        if (imgSkin.id != 0) {
          document.getElementById('createSkinIframeSource').contentWindow.document.body.append(imgSkin)
        }
      }
    }
  }
  //除了界的，没适配的皮肤在这里
  else {
    for (let id = 1; id <= 12; id++) {
      var imgSkin = document.createElement('img')
      imgSkin.id = generalID * 100 + id
      imgSkin.className = 'skinList'
      imgSkin.classList.add(generalID)
      imgSkin.src = 'https://web.sanguosha.com/220/h5_2/res/runtime/pc/general/seat/static/' + imgSkin.id + '.png'
      if (imgSkin.id != 0) {
        document.getElementById('createSkinIframeSource').contentWindow.document.body.append(imgSkin)
      }
    }
  }
  document
    .getElementById('createSkinIframeSource')
    .contentWindow.document.querySelectorAll('.skinList')
    .forEach(function (img) {
      img.onerror = function () {
        this.style.display = 'none'
      }
    })
}

function updateSkinListGuoZhan(generalID1, generalID2) {
  document.getElementById('createSkinIframeSource').contentWindow.document.body.innerHTML = ''
  if (typeof skinMap[generalID1] != 'undefined') {
    for (let i = 0; i < skinMap[generalID1].length; i++) {
      for (let id = 1; id <= 12; id++) {
        var imgSkin = document.createElement('img')
        imgSkin.id = skinMap[generalID1][i] * 100 + id
        imgSkin.className = 'skinList'
        imgSkin.classList.add(generalID1)
        imgSkin.src = 'https://web.sanguosha.com/220/h5_2/res/runtime/pc/general/seat/static/' + imgSkin.id + '.png'
        if (imgSkin.id != 0) {
          document.getElementById('createSkinIframeSource').contentWindow.document.body.append(imgSkin)
        }
      }
    }
  }
  const lineBreak = document.createElement('br')
  document.getElementById('createSkinIframeSource').contentWindow.document.body.append(lineBreak)
  if (typeof skinMap[generalID2] != 'undefined') {
    for (let i = 0; i < skinMap[generalID2].length; i++) {
      for (let id = 1; id <= 12; id++) {
        var imgSkin = document.createElement('img')
        imgSkin.id = skinMap[generalID2][i] * 100 + id
        imgSkin.className = 'skinList'
        imgSkin.classList.add(generalID2)
        imgSkin.src = 'https://web.sanguosha.com/220/h5_2/res/runtime/pc/general/seat/static/' + imgSkin.id + '.png'
        if (imgSkin.id != 0) {
          document.getElementById('createSkinIframeSource').contentWindow.document.body.append(imgSkin)
        }
      }
    }
  }
  document
    .getElementById('createSkinIframeSource')
    .contentWindow.document.querySelectorAll('.skinList')
    .forEach(function (img) {
      img.onerror = function () {
        this.style.display = 'none'
      }
    })
}

function resetOrderContainer() {
  for (let i = 0; i <= 7; i++) {
    document.getElementById('iframe-source').contentWindow.document.getElementsByClassName('orderContainer')[i].style.display = 'inline-block'
  }
}

function hideOrderContainer(size) {
  for (let i = 7; i >= size; i--) {
    document.getElementById('iframe-source').contentWindow.document.getElementsByClassName('orderContainer')[i].style.display = 'none'
  }
}

function imageExists(image_url) {
  var http = new XMLHttpRequest()

  http.open('HEAD', image_url, false)
  http.send()

  return http.status != 404
}

function clickToChangeSkinAndCloseSkinFrame() {
  const boxes = document.getElementById('createSkinIframeSource').contentWindow.document.querySelectorAll('.skinList')

  boxes.forEach((box) => {
    box.addEventListener('click', function handleClick(event) {
      mySkin = box.id
      document.getElementById('createSkinIframe').style.display = 'none'
    })
  })
}

function addFrame() {
  isFrameAdd = true
  let div = document.getElementById('createIframe')

  if (!div) {
    div = document.createElement('div')
    div.id = 'createIframe'
    div.className = 'createIframe'
    div.style = 'position: fixed;' + 'overflow: auto; ' + 'resize: vertical;  ' + 'top: 200px; ' + 'right: 5px;' + 'width: 210px;' + 'height:25px;' + 'z-index: 10000000000;' + 'display: flex;' + 'flex-direction: column;' + 'color: #f2de9c;' + 'background: rgb(50,50,50);' + 'user-select:none;' + 'text-align: left;'

    var header = document.createElement('p')
    header.id = 'header'
    header.className = 'header'
    header.innerText = '三国杀打小抄'
    header.style = 'style:display:inline-block;' + 'margin:1px;' + 'user-select:none;' + 'cursor: move'
    div.appendChild(header)
    var btn = document.createElement('btn')

    btn.innerText = '+'
    btn.id = 'toggle-me'
    btn.style = 'text-align:center;' + 'color: #f2de9c;' + 'background: rgb(40,40,40);' + 'border-radius:5px;' + 'margin-left:3px;' + 'border: 1px solid rgb(212,212,162);' + 'cursor: pointer;' + 'user-select:none;' + 'background: rgb(107,30,30);'
    header.append(btn)
    document.body.appendChild(div)

    iframe = document.createElement('iframe')
    iframe.style = 'border: none; width: 210px; height : 500px; margin: 0px; cursor: move; display: none;'
    iframe.id = 'iframe-source'
    iframe.title = 'iframe'

    //iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
    div.append(iframe)
    iframe.contentWindow.document.open()
    iframe.contentWindow.document.write(html)
    iframe.contentWindow.document.close()
  }
}

function buttonClick() {
  var toggle = document.getElementById('toggle-me')
  toggle.onmousedown = function () {
    closeIframe = !closeIframe
    if (closeIframe) {
      document.getElementById('iframe-source').style.display = 'none'
      toggle.innerText = '+'
      document.getElementById('createIframe').style.height = '25px'
    } else {
      document.getElementById('iframe-source').style.display = 'block'
      toggle.innerText = 'x'
      document.getElementById('createIframe').style.height = '500px'
    }
  }

  var MiZhuCalBTN = document.getElementById('iframe-source').contentWindow.document.getElementById('mizhu')
  var mySeat1BTN = document.getElementById('iframe-source').contentWindow.document.getElementById('mySeatID1')
  var mySeat2BTN = document.getElementById('iframe-source').contentWindow.document.getElementById('mySeatID2')

  MiZhuCalBTN.onmousedown = function () {
    if (mySeatID.size == 1) {
      mySeat1BTN.style.display = 'none'
      mySeat2BTN.style.display = 'none'
      for (const m of mySeatID) {
        MiZhuCards = []
        for (const card of shoupai[idOrder[m]]) {
          MiZhuCards.push(getCardNumAndSuit(card)['cardNum'])
        }
        MiZhuCal(MiZhuCards, MiZhuCards.length)
        drawMiZhu(MiZhuRes)
      }
    } else {
      var index = 0
      for (const m of mySeatID) {
        index += 1
        var seatIND = 'mySeatID' + index
        document.getElementById('iframe-source').contentWindow.document.getElementById(seatIND).style.display = 'block'
        document.getElementById('iframe-source').contentWindow.document.getElementById(seatIND).innerText = '座位: ' + (idOrder[m] + 1)
        document.getElementById('iframe-source').contentWindow.document.getElementById(seatIND).onmousedown = function () {
          MiZhuCards = []
          for (const card of shoupai[idOrder[m]]) {
            MiZhuCards.push(getCardNumAndSuit(card)['cardNum'])
          }
          MiZhuCal(MiZhuCards, MiZhuCards.length)
          drawMiZhu(MiZhuRes)
        }
      }
    }
  }
}

function initDragElement() {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0
  var popups = document.getElementsByClassName('createIframe')
  var elmnt = null
  var currentZIndex = 100

  for (var i = 0; i < popups.length; i++) {
    var popup = popups[i]
    var header = getHeader(popup)

    popup.onmousedown = function () {
      this.style.zIndex = '' + ++currentZIndex
    }

    if (header) {
      header.parentPopup = popup
      header.onmousedown = dragMouseDown
    }
  }

  function dragMouseDown(e) {
    elmnt = this.parentPopup
    elmnt.style.zIndex = '' + ++currentZIndex

    e = e || window.event
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    if (!elmnt) {
      return
    }

    e = e || window.event
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null
    document.onmousemove = null
  }

  function getHeader(element) {
    var headerItems = element.getElementsByClassName('header')

    if (headerItems.length === 1) {
      return headerItems[0]
    }

    return null
  }
}

try {
  main()
} catch (e) {
  console.error(e)
  document.getElementById('iframe-source').contentWindow.document.getElementById('nav1').innerHTML = '<b>小抄GG了，联系作者解决</b>'
}
