// 鼠标指针相对于以原点为坐标系，x轴正方向和y轴正方向为第一象限逆时针
// 旋转分别为第二、第三、第四象限，0表示原点
// 这么分主要是选择器在鼠标点下的时候为坐标原点，往四个方向都是不同的计算方式
//              ↑ y
//             |
//     2       |     1
//             |
//  ←----------0----------→ x
//             |
//      3      |     4
//             |
export type Quadrant = '1' | '2' | '3' | '4' | '0'