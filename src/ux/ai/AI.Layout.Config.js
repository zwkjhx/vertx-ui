const STANDARD = {
    4006: "12,12",   // ---- --
    4106: "10,14",   //        -- ----
    4206: "10,14",   //                ---- --
    4306: "10,14",   //                       -- ----
    3008: "9,15",    // ---- ----
    3108: "8,16",    //           ---- ----
    3208: "8,16",    //                     ---- ----
    3006: "12,12",   // ---- --
    3106: "10,14",   //        -- ----
    3212: "5,19",    //                ---- ---- ----
    3012: "6,18",    // ---- ---- ----
    3206: "10,14",   //                       -- ----
    1024: "3,21",    // ---- ---- ---- ---- ---- ----
    2012: "6,18",    // ---- ---- ----
    2112: "5,19",    //                ---- ---- ----
    2008: "9,15",    // ---- ----
    2116: "4,20",    //           ---- ---- ---- ----
    2016: "4,20",    // ---- ---- ---- ----
    2108: "8,16",    //                     ---- ----
    2006: "12,12",   // ---- --
    2118: "3,21",    //        -- ---- ---- ---- ----
    2018: "4,20",    // ---- ---- ---- ---- --
    2106: "10,14",   //                       -- ----
};
const STANDARD_2 = {
    4006: "12,12",   // ---- --
    4106: "10,14",   //        -- ----
    4206: "10,14",   //                ---- --
    4306: "10,14",   //                       -- ----
    3008: "9,15",    // ---- ----
    3108: "8,16",    //           ---- ----
    3208: "8,16",    //                     ---- ----
    3006: "12,12",   // ---- --
    3106: "10,14",   //        -- ----
    3212: "5,19",    //                ---- ---- ----
    3012: "6,18",    // ---- ---- ----
    3206: "10,14",   //                       -- ----
    1024: "3,21",    // ---- ---- ---- ---- ---- ----
    2012: "6,18",    // ---- ---- ----
    2112: "5,19",    //                ---- ---- ----
    2008: "9,15",    // ---- ----
    2116: "4,20",    //           ---- ---- ---- ----
    2016: "4,20",    // ---- ---- ---- ----
    2108: "8,16",    //                     ---- ----
    2006: "12,12",   // ---- --
    2118: "3,21",    //        -- ---- ---- ---- ----
    2018: "4,20",    // ---- ---- ---- ---- --
    2106: "10,14",   //                       -- ----
};
const ADJUST100 = {
    2118: "2%",      //        -- ---- ---- ---- ----
    2016: "2%"       // ---- ---- ---- ----
};
const ADJUST102 = {
    2118: "2%",      //        -- ---- ---- ---- ----
    2016: "2%"       // ---- ---- ---- ----
};
export default {
    span: {
        // 平均分配
        1: STANDARD,
        // 左边3栅栏的偏移量
        1.02: STANDARD_2
    },
    adjust: {
        1: ADJUST100,
        1.02: ADJUST102
    }
}