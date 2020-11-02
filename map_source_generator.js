const fs = require('fs');
var path = require("path");
var Image = require("./Image_util.js");

const map_info = [
  { name: "mage", code:"mg", color: { r: 121, g: 64, b: 245, a: 255}},

  { name: "mid_city_0_0", code:"c0", color: { r: 114, g: 122, b: 142, a: 255}},
  { name: "mid_city_0_1", code:"c1", color: { r: 119, g: 126, b: 146, a: 255}},
  { name: "mid_city_0_2", code:"c2", color: { r: 142, g: 147, b: 159, a: 255}},
  { name: "mid_city_0_3", code:"c3", color: { r: 171, g: 174, b: 178, a: 255}},
  { name: "mid_city_0_4", code:"c4", color: { r: 200, g: 199, b: 196, a: 255}},
  { name: "mid_city_0_5", code:"c5", color: { r: 240, g: 232, b: 204, a: 255}},
  { name: "mid_city_0_6", code:"c6", color: { r: 33, g: 43, b: 68, a: 255}},

  { name: "mid_city_1_0", code:"d0", color: { r: 255, g: 138, b: 158, a: 255}},
  { name: "mid_city_1_1", code:"d1", color: { r: 44, g: 51, b: 61, a: 255}},
  { name: "mid_city_1_2", code:"d2", color: { r: 53, g: 59, b: 72, a: 255}},
  { name: "mid_city_1_3", code:"d3", color: { r: 63, g: 67, b: 83, a: 255}},
  { name: "mid_city_1_4", code:"d4", color: { r: 73, g: 77, b: 94, a: 255}},
  { name: "mid_city_1_5", code:"d5", color: { r: 86, g: 93, b: 110, a: 255}},
  { name: "mid_city_1_6", code:"d6", color: { r: 101, g: 108, b: 127, a: 255}},

  { name: "mid_city_2_0", code:"e0", color: { r: 142, g: 30, b: 66, a: 255}},
  { name: "mid_city_2_1", code:"e1", color: { r: 191, g: 55, b: 34, a: 255}},
  { name: "mid_city_2_2", code:"e2", color: { r: 250, g: 100, b: 47, a: 255}},
  { name: "mid_city_2_3", code:"e3", color: { r: 239, g: 169, b: 63, a: 255}},
  { name: "mid_city_2_4", code:"e4", color: { r: 251, g: 232, b: 150, a: 255}},
  { name: "mid_city_2_5", code:"e5", color: { r: 165, g: 135, b: 110, a: 255}},
  { name: "mid_city_2_6", code:"e6", color: { r: 174, g: 147, b: 121, a: 255}},
  
  { name: "mid_city_3_0", code:"f0", color: { r: 187, g: 163, b: 138, a: 255}},
  { name: "mid_city_3_1", code:"f1", color: { r: 202, g: 184, b: 157, a: 255}},
  { name: "mid_city_3_2", code:"f2", color: { r: 218, g: 203, b: 176, a: 255}},
  { name: "mid_city_3_3", code:"f3", color: { r: 231, g: 220, b: 193, a: 255}},
  { name: "mid_city_3_4", code:"f4", color: { r: 95, g: 53, b: 56, a: 255}},
  { name: "mid_city_3_5", code:"f5", color: { r: 111, g: 64, b: 59, a: 255}},
  { name: "mid_city_3_6", code:"f6", color: { r: 136, g: 78, b: 63, a: 255}},
  
  { name: "mid_city_4_0", code:"g0", color: { r: 159, g: 91, b: 68, a: 255}},
  { name: "mid_city_4_1", code:"g1", color: { r: 95, g: 25, b: 52, a: 255}},
  { name: "mid_city_4_2", code:"g2", color: { r: 140, g: 11, b: 44, a: 255}},
  { name: "mid_city_4_3", code:"g3", color: { r: 162, g: 36, b: 44, a: 255}},
  { name: "mid_city_4_4", code:"g4", color: { r: 193, g: 55, b: 62, a: 255}},
  { name: "mid_city_4_5", code:"g5", color: { r: 223, g: 62, b: 70, a: 255}},
  { name: "mid_city_4_6", code:"g6", color: { r: 119, g: 38, b: 47, a: 255}},
  
  { name: "mid_city_5_0", code:"a0", color: { r: 152, g: 32, b: 46, a: 255}},
  { name: "mid_city_5_1", code:"a1", color: { r: 164, g: 50, b: 52, a: 255}},
  { name: "mid_city_5_2", code:"a2", color: { r: 182, g: 76, b: 59, a: 255}},
  { name: "mid_city_5_3", code:"a3", color: { r: 199, g: 102, b: 67, a: 255}},
  { name: "mid_city_5_4", code:"a4", color: { r: 211, g: 120, b: 60, a: 255}},
  { name: "mid_city_5_5", code:"a5", color: { r: 185, g: 107, b: 51, a: 255}},
  { name: "mid_city_5_6", code:"a6", color: { r: 204, g: 131, b: 60, a: 255}},
  
  { name: "mid_city_6_0", code:"b0", color: { r: 210, g: 150, b: 67, a: 255}},
  { name: "mid_city_6_1", code:"b1", color: { r: 218, g: 176, b: 77, a: 255}},
  { name: "mid_city_6_2", code:"b2", color: { r: 231, g: 203, b: 85, a: 255}},
  { name: "mid_city_6_3", code:"b3", color: { r: 55, g: 88, b: 57, a: 255}},
  { name: "mid_city_6_4", code:"b4", color: { r: 71, g: 126, b: 61, a: 255}},
  { name: "mid_city_6_5", code:"b5", color: { r: 107, g: 145, b: 71, a: 255}},
  { name: "mid_city_6_6", code:"b6", color: { r: 153, g: 172, b: 82, a: 255}},

  { name: "mid_city_7_0", code:"h0", color: { r: 199, g: 200, b: 92, a: 255}},
  { name: "mid_city_7_1", code:"h1", color: { r: 42, g: 86, b: 81, a: 255}},
  { name: "mid_city_7_2", code:"h2", color: { r: 40, g: 127, b: 78, a: 255}},
  { name: "mid_city_7_3", code:"h3", color: { r: 67, g: 146, b: 90, a: 255}},
  { name: "mid_city_7_4", code:"h4", color: { r: 100, g: 175, b: 105, a: 255}},
  { name: "mid_city_7_5", code:"h5", color: { r: 133, g: 202, b: 119, a: 255}},
  { name: "mid_city_7_6", code:"h6", color: { r: 40, g: 61, b: 127, a: 255}},

  { name: "mid_city_8_0", code:"i0", color: { r: 40, g: 78, b: 133, a: 255}},
  { name: "mid_city_8_1", code:"i1", color: { r: 42, g: 99, b: 142, a: 255}},
  { name: "mid_city_8_2", code:"i2", color: { r: 66, g: 138, b: 155, a: 255}},
  { name: "mid_city_8_3", code:"i3", color: { r: 99, g: 169, b: 164, a: 255}},
  { name: "mid_city_8_4", code:"i4", color: { r: 130, g: 200, b: 172, a: 255}},
  { name: "mid_city_8_5", code:"i5", color: { r: 39, g: 41, b: 96, a: 255}},
  { name: "mid_city_8_6", code:"i6", color: { r: 47, g: 55, b: 112, a: 255}},

  { name: "mid_city_9_0", code:"j0", color: { r: 57, g: 76, b: 135, a: 255}},
  { name: "mid_city_9_1", code:"j1", color: { r: 70, g: 98, b: 161, a: 255}},
  { name: "mid_city_9_2", code:"j2", color: { r: 81, g: 118, b: 184, a: 255}},
  { name: "mid_city_9_3", code:"j3", color: { r: 121, g: 156, b: 211, a: 255}},
  { name: "mid_city_9_4", code:"j4", color: { r: 52, g: 33, b: 99, a: 255}},
  { name: "mid_city_9_5", code:"j5", color: { r: 74, g: 43, b: 113, a: 255}},
  { name: "mid_city_9_6", code:"j6", color: { r: 106, g: 58, b: 134, a: 255}},

  { name: "mid_city_10_0", code:"k0", color: { r: 199, g: 87, b: 166, a: 255}},
  { name: "mid_city_10_1", code:"k1", color: { r: 174, g: 89, b: 178, a: 255}},
  { name: "mid_city_10_2", code:"k2", color: { r: 224, g: 121, b: 190, a: 255}},
  { name: "mid_city_10_3", code:"k3", color: { r: 100, g: 32, b: 115, a: 255}},
  { name: "mid_city_10_4", code:"k4", color: { r: 118, g: 42, b: 124, a: 255}},
  { name: "mid_city_10_5", code:"k5", color: { r: 144, g: 56, b: 138, a: 255}},
  { name: "mid_city_10_6", code:"k6", color: { r: 172, g: 73, b: 153, a: 255}},

  { name: "mid_city_11_0", code:"l0", color: { r: 255, g: 2, b: 213, a: 255}},
  { name: "mid_city_11_1", code:"l1", color: { r: 255, g: 4, b: 211, a: 255}},
  { name: "mid_city_11_2", code:"l2", color: { r: 255, g: 7, b: 209, a: 255}},
  { name: "mid_city_11_3", code:"l3", color: { r: 255, g: 9, b: 207, a: 255}},
  { name: "mid_city_11_4", code:"l4", color: { r: 255, g: 11, b: 205, a: 255}},
  { name: "mid_city_11_5", code:"l5", color: { r: 255, g: 14, b: 203, a: 255}},
  { name: "mid_city_11_6", code:"l6", color: { r: 255, g: 16, b: 201, a: 255}},

  { name: "mid_city_12_0", code:"m0", color: { r: 255, g: 19, b: 199, a: 255}},
  { name: "mid_city_12_1", code:"m1", color: { r: 254, g: 21, b: 197, a: 255}},
  { name: "mid_city_12_2", code:"m2", color: { r: 254, g: 23, b: 195, a: 255}},
  { name: "mid_city_12_3", code:"m3", color: { r: 254, g: 26, b: 193, a: 255}},
  { name: "mid_city_12_4", code:"m4", color: { r: 254, g: 28, b: 191, a: 255}},
  { name: "mid_city_12_5", code:"m5", color: { r: 254, g: 30, b: 189, a: 255}},
  { name: "mid_city_12_6", code:"m6", color: { r: 254, g: 33, b: 187, a: 255}},

  { name: "mid_city_13_0", code:"n0", color: { r: 254, g: 35, b: 185, a: 255}},
  { name: "mid_city_13_1", code:"n1", color: { r: 254, g: 38, b: 183, a: 255}},
  { name: "mid_city_13_2", code:"n2", color: { r: 253, g: 40, b: 181, a: 255}},
  { name: "mid_city_13_3", code:"n3", color: { r: 253, g: 42, b: 179, a: 255}},
  { name: "mid_city_13_4", code:"n4", color: { r: 253, g: 45, b: 177, a: 255}},
  { name: "mid_city_13_5", code:"n5", color: { r: 253, g: 47, b: 175, a: 255}},
  { name: "mid_city_13_6", code:"n6", color: { r: 253, g: 50, b: 173, a: 255}},

  { name: "mid_city_14_0", code:"o0", color: { r: 253, g: 52, b: 171, a: 255}},
  { name: "mid_city_14_1", code:"o1", color: { r: 253, g: 54, b: 169, a: 255}},
  { name: "mid_city_14_2", code:"o2", color: { r: 253, g: 57, b: 167, a: 255}},
  { name: "mid_city_14_3", code:"o3", color: { r: 252, g: 59, b: 165, a: 255}},
  { name: "mid_city_14_4", code:"o4", color: { r: 252, g: 61, b: 163, a: 255}},
  { name: "mid_city_14_5", code:"o5", color: { r: 252, g: 64, b: 161, a: 255}},
  { name: "mid_city_14_6", code:"o6", color: { r: 252, g: 66, b: 159, a: 255}},

  { name: "mid_city_15_0", code:"p0", color: { r: 252, g: 69, b: 157, a: 255}},
  { name: "mid_city_15_1", code:"p1", color: { r: 252, g: 71, b: 155, a: 255}},
  { name: "mid_city_15_2", code:"p2", color: { r: 252, g: 73, b: 153, a: 255}},
  { name: "mid_city_15_3", code:"p3", color: { r: 252, g: 76, b: 151, a: 255}},
  { name: "mid_city_15_4", code:"p4", color: { r: 251, g: 78, b: 149, a: 255}},
  { name: "mid_city_15_5", code:"p4", color: { r: 251, g: 81, b: 147, a: 255}},
  { name: "mid_city_15_6", code:"p6", color: { r: 251, g: 83, b: 145, a: 255}},

  { name: "mid_city_16_0", code:"q0", color: { r: 251, g: 85, b: 143, a: 255}},
  { name: "mid_city_16_1", code:"q1", color: { r: 251, g: 88, b: 141, a: 255}},
  { name: "mid_city_16_2", code:"q2", color: { r: 251, g: 90, b: 139, a: 255}},
  { name: "mid_city_16_3", code:"q3", color: { r: 251, g: 92, b: 137, a: 255}},
  { name: "mid_city_16_4", code:"q4", color: { r: 251, g: 95, b: 135, a: 255}},
  { name: "mid_city_16_5", code:"q5", color: { r: 251, g: 97, b: 133, a: 255}},
  { name: "mid_city_16_6", code:"q6", color: { r: 250, g: 100, b: 131, a: 255}},

  { name: "mid_city_17_0", code:"r0", color: { r: 250, g: 102, b: 129, a: 255}},
  { name: "mid_city_17_1", code:"r1", color: { r: 250, g: 104, b: 127, a: 255}},
  { name: "mid_city_17_2", code:"r2", color: { r: 250, g: 107, b: 125, a: 255}},
  { name: "mid_city_17_3", code:"r3", color: { r: 250, g: 109, b: 123, a: 255}},
  { name: "mid_city_17_4", code:"r4", color: { r: 250, g: 112, b: 121, a: 255}},
  { name: "mid_city_17_5", code:"r5", color: { r: 250, g: 114, b: 119, a: 255}},
  { name: "mid_city_17_6", code:"r6", color: { r: 250, g: 116, b: 117, a: 255}},

  { name: "mid_city_18_1", code:"s1", color: { r: 249, g: 119, b: 115, a: 255}},
  { name: "mid_city_18_2", code:"s2", color: { r: 249, g: 121, b: 113, a: 255}},
  { name: "mid_city_18_3", code:"s3", color: { r: 249, g: 123, b: 111, a: 255}},
  { name: "mid_city_18_4", code:"s4", color: { r: 249, g: 126, b: 109, a: 255}},
  { name: "mid_city_18_5", code:"s5", color: { r: 249, g: 128, b: 107, a: 255}},

  { name: "mid_city_19_1", code:"t1", color: { r: 249, g: 131, b: 105, a: 255}},
  { name: "mid_city_19_2", code:"t2", color: { r: 249, g: 133, b: 103, a: 255}},
  { name: "mid_city_19_3", code:"t3", color: { r: 249, g: 135, b: 101, a: 255}},
  { name: "mid_city_19_4", code:"t4", color: { r: 248, g: 138, b: 99, a: 255}},
  { name: "mid_city_19_5", code:"t5", color: { r: 248, g: 140, b: 97, a: 255}},

  { name: "mid_city_20_1", code:"u1", color: { r: 248, g: 142, b: 95, a: 255}},
  { name: "mid_city_20_2", code:"u2", color: { r: 248, g: 145, b: 93, a: 255}},
  { name: "mid_city_20_3", code:"u3", color: { r: 248, g: 147, b: 91, a: 255}},
  { name: "mid_city_20_4", code:"u4", color: { r: 248, g: 150, b: 89, a: 255}},
  { name: "mid_city_20_5", code:"u5", color: { r: 248, g: 152, b: 87, a: 255}},
  
  { name: "mid_city_21_1", code:"v1", color: { r: 248, g: 154, b: 85, a: 255}},
  { name: "mid_city_21_2", code:"v2", color: { r: 247, g: 157, b: 83, a: 255}},
  { name: "mid_city_21_3", code:"v3", color: { r: 247, g: 159, b: 81, a: 255}},
  { name: "mid_city_21_4", code:"v4", color: { r: 247, g: 162, b: 79, a: 255}},
  { name: "mid_city_21_5", code:"v5", color: { r: 247, g: 164, b: 77, a: 255}},

  { name: "mid_city_22_1", code:"w1", color: { r: 247, g: 166, b: 75, a: 255}},
  { name: "mid_city_22_2", code:"w2", color: { r: 247, g: 169, b: 73, a: 255}},
  { name: "mid_city_22_3", code:"w3", color: { r: 247, g: 171, b: 71, a: 255}},
  { name: "mid_city_22_4", code:"w4", color: { r: 247, g: 173, b: 69, a: 255}},
  { name: "mid_city_22_5", code:"w5", color: { r: 247, g: 176, b: 67, a: 255}},

  { name: "mid_city_23_1", code:"x1", color: { r: 246, g: 178, b: 65, a: 255}},
  { name: "mid_city_23_2", code:"x2", color: { r: 246, g: 181, b: 63, a: 255}},
  { name: "mid_city_23_3", code:"x3", color: { r: 246, g: 183, b: 61, a: 255}},
  { name: "mid_city_23_4", code:"x4", color: { r: 246, g: 185, b: 59, a: 255}},
  { name: "mid_city_23_5", code:"x5", color: { r: 246, g: 188, b: 57, a: 255}},

  { name: "mid_city_24_1", code:"y1", color: { r: 246, g: 190, b: 55, a: 255}},
  { name: "mid_city_24_2", code:"y2", color: { r: 246, g: 193, b: 53, a: 255}},
  { name: "mid_city_24_3", code:"y3", color: { r: 246, g: 195, b: 51, a: 255}},
  { name: "mid_city_24_4", code:"y4", color: { r: 245, g: 197, b: 49, a: 255}},
  { name: "mid_city_24_5", code:"y5", color: { r: 245, g: 200, b: 47, a: 255}},

  { name: "mid_city_25_1", code:"z1", color: { r: 245, g: 202, b: 45, a: 255}},
  { name: "mid_city_25_2", code:"z2", color: { r: 245, g: 204, b: 43, a: 255}},
  { name: "mid_city_25_3", code:"z3", color: { r: 245, g: 207, b: 41, a: 255}},
  { name: "mid_city_25_4", code:"z4", color: { r: 245, g: 209, b: 39, a: 255}},
  { name: "mid_city_25_5", code:"z5", color: { r: 245, g: 212, b: 37, a: 255}},
  
  { name: "mid_city_26_1", code:"ac", color: { r: 245, g: 214, b: 35, a: 255}},
  { name: "mid_city_26_2", code:"ad", color: { r: 244, g: 216, b: 33, a: 255}},
  { name: "mid_city_26_3", code:"ae", color: { r: 244, g: 219, b: 31, a: 255}},
  { name: "mid_city_26_4", code:"af", color: { r: 244, g: 221, b: 29, a: 255}},
  { name: "mid_city_26_5", code:"ag", color: { r: 244, g: 224, b: 27, a: 255}},
  
  { name: "mid_city_27_1", code:"bc", color: { r: 244, g: 226, b: 25, a: 255}},
  { name: "mid_city_27_2", code:"bd", color: { r: 244, g: 228, b: 23, a: 255}},
  { name: "mid_city_27_3", code:"be", color: { r: 244, g: 231, b: 21, a: 255}},
  { name: "mid_city_27_4", code:"bf", color: { r: 244, g: 233, b: 19, a: 255}},
  { name: "mid_city_27_5", code:"bg", color: { r: 243, g: 235, b: 17, a: 255}},
  
  { name: "mid_city_28_1", code:"cc", color: { r: 243, g: 238, b: 15, a: 255}},
  { name: "mid_city_28_2", code:"cd", color: { r: 243, g: 240, b: 13, a: 255}},
  { name: "mid_city_28_3", code:"ce", color: { r: 243, g: 243, b: 11, a: 255}},
  { name: "mid_city_28_4", code:"cf", color: { r: 243, g: 245, b: 9, a: 255}},
  { name: "mid_city_28_5", code:"cg", color: { r: 243, g: 247, b: 7, a: 255}},
  
  { name: "mid_city_29_1", code:"dc", color: { r: 243, g: 250, b: 5, a: 255}},
  { name: "mid_city_29_2", code:"dd", color: { r: 243, g: 252, b: 3, a: 255}},
  { name: "mid_city_29_3", code:"de", color: { r: 242, g: 255, b: 0, a: 255}},
  { name: "mid_city_29_4", code:"df", color: { r: 201, g: 212, b: 4, a: 255}},
  { name: "mid_city_29_5", code:"dg", color: { r: 160, g: 169, b: 6, a: 255}},
  
  { name: "mid_city_30_1", code:"ec", color: { r: 250, g: 131, b: 169, a: 255}},
  { name: "mid_city_30_2", code:"ed", color: { r: 113, g: 30, b: 81, a: 255}},
  { name: "mid_city_30_3", code:"ee", color: { r: 132, g: 42, b: 88, a: 255}},
  { name: "mid_city_30_4", code:"ef", color: { r: 160, g: 59, b: 97, a: 255}},
  { name: "mid_city_30_5", code:"eg", color: { r: 191, g: 80, b: 108, a: 255}},
  
  { name: "mid_city_31_1", code:"fc", color: { r: 51, g: 64, b: 100, a: 255}},
  { name: "mid_city_31_2", code:"fd", color: { r: 54, g: 63, b: 98, a: 255}},
  { name: "mid_city_31_3", code:"fe", color: { r: 57, g: 62, b: 97, a: 255}},
  { name: "mid_city_31_4", code:"ff", color: { r: 60, g: 61, b: 95, a: 255}},
  { name: "mid_city_31_5", code:"fg", color: { r: 64, g: 60, b: 94, a: 255}},
  
  { name: "mid_city_32_1", code:"gc", color: { r: 73, g: 57, b: 89, a: 255}},
  { name: "mid_city_32_2", code:"gd", color: { r: 76, g: 56, b: 87, a: 255}},
  { name: "mid_city_32_3", code:"ge", color: { r: 80, g: 55, b: 86, a: 255}},
  { name: "mid_city_32_4", code:"gf", color: { r: 83, g: 54, b: 84, a: 255}},
  { name: "mid_city_32_5", code:"gg", color: { r: 86, g: 53, b: 83, a: 255}},
  
  { name: "mid_city_33_1", code:"hc", color: { r: 96, g: 50, b: 78, a: 255}},
  { name: "mid_city_33_2", code:"hd", color: { r: 99, g: 49, b: 76, a: 255}},
  { name: "mid_city_33_3", code:"he", color: { r: 102, g: 48, b: 75, a: 255}},
  { name: "mid_city_33_4", code:"hf", color: { r: 105, g: 47, b: 73, a: 255}},
  { name: "mid_city_33_5", code:"hg", color: { r: 109, g: 46, b: 72, a: 255}},
  
  { name: "mid_city_34_1", code:"ic", color: { r: 118, g: 44, b: 67, a: 255}},
  { name: "mid_city_34_2", code:"id", color: { r: 122, g: 43, b: 65, a: 255}},
  { name: "mid_city_34_3", code:"ie", color: { r: 125, g: 42, b: 64, a: 255}},
  { name: "mid_city_34_4", code:"if", color: { r: 128, g: 41, b: 62, a: 255}},
  { name: "mid_city_34_5", code:"ig", color: { r: 131, g: 40, b: 61, a: 255}},
  
  { name: "mid_city_35_1", code:"jc", color: { r: 141, g: 37, b: 56, a: 255}},
  { name: "mid_city_35_2", code:"jd", color: { r: 144, g: 36, b: 54, a: 255}},
  { name: "mid_city_35_3", code:"je", color: { r: 147, g: 35, b: 53, a: 255}},
  { name: "mid_city_35_4", code:"jf", color: { r: 151, g: 34, b: 51, a: 255}},
  { name: "mid_city_35_5", code:"jg", color: { r: 154, g: 33, b: 49, a: 255}},
  
  { name: "mid_city_36_1", code:"kc", color: { r: 163, g: 30, b: 45, a: 255}},
  { name: "mid_city_36_2", code:"kd", color: { r: 167, g: 29, b: 43, a: 255}},
  { name: "mid_city_36_3", code:"ke", color: { r: 170, g: 28, b: 42, a: 255}},
  { name: "mid_city_36_4", code:"kf", color: { r: 173, g: 27, b: 40, a: 255}},
  { name: "mid_city_36_5", code:"kg", color: { r: 176, g: 27, b: 38, a: 255}},
  
  { name: "mid_city_37_1", code:"lc", color: { r: 186, g: 24, b: 34, a: 255}},
  { name: "mid_city_37_2", code:"ld", color: { r: 189, g: 23, b: 32, a: 255}},
  { name: "mid_city_37_3", code:"le", color: { r: 192, g: 22, b: 31, a: 255}},
  { name: "mid_city_37_4", code:"lf", color: { r: 196, g: 21, b: 29, a: 255}},
  { name: "mid_city_37_5", code:"lg", color: { r: 199, g: 20, b: 27, a: 255}},
  
  { name: "mid_city_38_1", code:"mc", color: { r: 209, g: 17, b: 23, a: 255}},
  { name: "mid_city_38_2", code:"md", color: { r: 212, g: 16, b: 21, a: 255}},
  { name: "mid_city_38_3", code:"me", color: { r: 215, g: 15, b: 20, a: 255}},
  { name: "mid_city_38_4", code:"mf", color: { r: 218, g: 14, b: 18, a: 255}},
  { name: "mid_city_38_5", code:"mg", color: { r: 221, g: 13, b: 16, a: 255}},

  { name: "blocked", code: "xx", color: { r: 23, g: 102, b: 215, a: 255 }},

]

var image_name = "lvl0.png";
const is_big_img = true;

function main(){
  if (is_big_img) {
    Image.read_big_image("img/maps/"+image_name)
    .then( image_info => { 
      const map_content = set_content(image_info, map_info)
      save_fm_file(image_name, map_content)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    })
    .catch( err => console.warn(err));

  } else {
    Image.read_image("img/maps/"+image_name)
    .then( image_info => {
      const map_content = set_content(image_info, map_info)
      save_fm_file(image_name, map_content)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    })
    .catch( err => console.warn(err));
  }
}
// "index.js: got an error of MIME for Buffer from Jimp"

function set_content(image_info, map_info){
  // Image_info: 74x74
  var map_content = "";
  var line = "";
  const pixels = image_info.pixels;
  pixels.forEach( pixel => {
    line += color_is_equal(pixel, map_info);
    if (is_full_line(line, image_info.width)){
      map_content += '"'+line+'",\n';
      line = "";
    }
  })
  return map_content;
}

function is_same_color(pixel, color) {
  return pixel.r === color.r && pixel.g === color.g && pixel.b === color.b;
}

function color_is_equal(pixel, map_info){
  let code = "";
  for (var i = 0; i < map_info.length; i++) {
    let obj = map_info[i];
    code += is_same_color(pixel.color, obj.color) ? obj.code : ""
  }
  return code === "" ? ".g" : code;
}

function is_full_line(line, width){
  return line.length === width*2 ? true : false; // x2 = code os 2 characteres
}

async function save_fm_file(image_name, content){
  var image_name = image_name.slice(0,-4);
  var path = "./fm_images/map_code/"+image_name+".fm";
  var content = content;
  try {
    fs.writeFileSync(path, content);
    return "Saved "+path;
  } catch (e) {
    throw e;
  }
}

main()