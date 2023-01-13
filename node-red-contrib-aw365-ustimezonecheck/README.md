## Introduction

The node can be used to check an incoming 3 digit US area code and provide the timezone where the area code is belonging to

The config handles EST, CST, MST and PST timezones. You can configure for each timezone a Starttime and an Endtime which will be send out in the msg.payload if an area code is recognized

## Area codes and timezones

[
  {
    "NPA": 201,
    "TZ": "EST"
  },
  {
    "NPA": 202,
    "TZ": "EST"
  },
  {
    "NPA": 203,
    "TZ": "EST"
  },
  {
    "NPA": 205,
    "TZ": "CST"
  },
  {
    "NPA": 206,
    "TZ": "PST"
  },
  {
    "NPA": 207,
    "TZ": "EST"
  },
  {
    "NPA": 208,
    "TZ": "PST"
  },
  {
    "NPA": 209,
    "TZ": "PST"
  },
  {
    "NPA": 210,
    "TZ": "CST"
  },
  {
    "NPA": 212,
    "TZ": "EST"
  },
  {
    "NPA": 213,
    "TZ": "PST"
  },
  {
    "NPA": 214,
    "TZ": "CST"
  },
  {
    "NPA": 215,
    "TZ": "EST"
  },
  {
    "NPA": 216,
    "TZ": "EST"
  },
  {
    "NPA": 217,
    "TZ": "CST"
  },
  {
    "NPA": 218,
    "TZ": "CST"
  },
  {
    "NPA": 219,
    "TZ": "CST"
  },
  {
    "NPA": 220,
    "TZ": "EST"
  },
  {
    "NPA": 223,
    "TZ": "EST"
  },
  {
    "NPA": 224,
    "TZ": "CST"
  },
  {
    "NPA": 225,
    "TZ": "CST"
  },
  {
    "NPA": 228,
    "TZ": "CST"
  },
  {
    "NPA": 229,
    "TZ": "EST"
  },
  {
    "NPA": 231,
    "TZ": "EST"
  },
  {
    "NPA": 234,
    "TZ": "EST"
  },
  {
    "NPA": 239,
    "TZ": "EST"
  },
  {
    "NPA": 240,
    "TZ": "EST"
  },
  {
    "NPA": 248,
    "TZ": "EST"
  },
  {
    "NPA": 251,
    "TZ": "CST"
  },
  {
    "NPA": 252,
    "TZ": "EST"
  },
  {
    "NPA": 253,
    "TZ": "PST"
  },
  {
    "NPA": 254,
    "TZ": "CST"
  },
  {
    "NPA": 256,
    "TZ": "CST"
  },
  {
    "NPA": 260,
    "TZ": "EST"
  },
  {
    "NPA": 262,
    "TZ": "CST"
  },
  {
    "NPA": 267,
    "TZ": "EST"
  },
  {
    "NPA": 269,
    "TZ": "EST"
  },
  {
    "NPA": 270,
    "TZ": "CST"
  },
  {
    "NPA": 272,
    "TZ": "EST"
  },
  {
    "NPA": 276,
    "TZ": "EST"
  },
  {
    "NPA": 279,
    "TZ": "PST"
  },
  {
    "NPA": 281,
    "TZ": "CST"
  },
  {
    "NPA": 301,
    "TZ": "EST"
  },
  {
    "NPA": 302,
    "TZ": "EST"
  },
  {
    "NPA": 303,
    "TZ": "MST"
  },
  {
    "NPA": 304,
    "TZ": "EST"
  },
  {
    "NPA": 305,
    "TZ": "EST"
  },
  {
    "NPA": 307,
    "TZ": "MST"
  },
  {
    "NPA": 308,
    "TZ": "MST"
  },
  {
    "NPA": 309,
    "TZ": "CST"
  },
  {
    "NPA": 310,
    "TZ": "PST"
  },
  {
    "NPA": 312,
    "TZ": "CST"
  },
  {
    "NPA": 313,
    "TZ": "EST"
  },
  {
    "NPA": 314,
    "TZ": "CST"
  },
  {
    "NPA": 315,
    "TZ": "EST"
  },
  {
    "NPA": 316,
    "TZ": "CST"
  },
  {
    "NPA": 317,
    "TZ": "EST"
  },
  {
    "NPA": 318,
    "TZ": "CST"
  },
  {
    "NPA": 319,
    "TZ": "CST"
  },
  {
    "NPA": 320,
    "TZ": "CST"
  },
  {
    "NPA": 321,
    "TZ": "EST"
  },
  {
    "NPA": 323,
    "TZ": "PST"
  },
  {
    "NPA": 325,
    "TZ": "CST"
  },
  {
    "NPA": 330,
    "TZ": "EST"
  },
  {
    "NPA": 331,
    "TZ": "CST"
  },
  {
    "NPA": 332,
    "TZ": "EST"
  },
  {
    "NPA": 334,
    "TZ": "CST"
  },
  {
    "NPA": 336,
    "TZ": "EST"
  },
  {
    "NPA": 337,
    "TZ": "CST"
  },
  {
    "NPA": 339,
    "TZ": "EST"
  },
  {
    "NPA": 346,
    "TZ": "CST"
  },
  {
    "NPA": 347,
    "TZ": "EST"
  },
  {
    "NPA": 351,
    "TZ": "EST"
  },
  {
    "NPA": 352,
    "TZ": "EST"
  },
  {
    "NPA": 360,
    "TZ": "PST"
  },
  {
    "NPA": 361,
    "TZ": "CST"
  },
  {
    "NPA": 364,
    "TZ": "CST"
  },
  {
    "NPA": 380,
    "TZ": "EST"
  },
  {
    "NPA": 385,
    "TZ": "MST"
  },
  {
    "NPA": 386,
    "TZ": "EST"
  },
  {
    "NPA": 401,
    "TZ": "EST"
  },
  {
    "NPA": 402,
    "TZ": "CST"
  },
  {
    "NPA": 404,
    "TZ": "EST"
  },
  {
    "NPA": 405,
    "TZ": "CST"
  },
  {
    "NPA": 406,
    "TZ": "MST"
  },
  {
    "NPA": 407,
    "TZ": "EST"
  },
  {
    "NPA": 408,
    "TZ": "PST"
  },
  {
    "NPA": 409,
    "TZ": "MST"
  },
  {
    "NPA": 410,
    "TZ": "EST"
  },
  {
    "NPA": 412,
    "TZ": "EST"
  },
  {
    "NPA": 413,
    "TZ": "EST"
  },
  {
    "NPA": 414,
    "TZ": "CST"
  },
  {
    "NPA": 415,
    "TZ": "PST"
  },
  {
    "NPA": 417,
    "TZ": "CST"
  },
  {
    "NPA": 419,
    "TZ": "EST"
  },
  {
    "NPA": 423,
    "TZ": "CST"
  },
  {
    "NPA": 424,
    "TZ": "PST"
  },
  {
    "NPA": 425,
    "TZ": "PST"
  },
  {
    "NPA": 430,
    "TZ": "CST"
  },
  {
    "NPA": 432,
    "TZ": "CST"
  },
  {
    "NPA": 434,
    "TZ": "EST"
  },
  {
    "NPA": 435,
    "TZ": "MST"
  },
  {
    "NPA": 440,
    "TZ": "EST"
  },
  {
    "NPA": 442,
    "TZ": "PST"
  },
  {
    "NPA": 443,
    "TZ": "EST"
  },
  {
    "NPA": 445,
    "TZ": "EST"
  },
  {
    "NPA": 458,
    "TZ": "PST"
  },
  {
    "NPA": 463,
    "TZ": "EST"
  },
  {
    "NPA": 469,
    "TZ": "CST"
  },
  {
    "NPA": 470,
    "TZ": "EST"
  },
  {
    "NPA": 475,
    "TZ": "EST"
  },
  {
    "NPA": 478,
    "TZ": "EST"
  },
  {
    "NPA": 479,
    "TZ": "CST"
  },
  {
    "NPA": 480,
    "TZ": "MST"
  },
  {
    "NPA": 484,
    "TZ": "EST"
  },
  {
    "NPA": 501,
    "TZ": "CST"
  },
  {
    "NPA": 502,
    "TZ": "EST"
  },
  {
    "NPA": 503,
    "TZ": "PST"
  },
  {
    "NPA": 504,
    "TZ": "CST"
  },
  {
    "NPA": 505,
    "TZ": "MST"
  },
  {
    "NPA": 507,
    "TZ": "CST"
  },
  {
    "NPA": 508,
    "TZ": "EST"
  },
  {
    "NPA": 509,
    "TZ": "PST"
  },
  {
    "NPA": 510,
    "TZ": "PST"
  },
  {
    "NPA": 512,
    "TZ": "CST"
  },
  {
    "NPA": 513,
    "TZ": "EST"
  },
  {
    "NPA": 515,
    "TZ": "CST"
  },
  {
    "NPA": 516,
    "TZ": "EST"
  },
  {
    "NPA": 517,
    "TZ": "EST"
  },
  {
    "NPA": 518,
    "TZ": "EST"
  },
  {
    "NPA": 520,
    "TZ": "MST"
  },
  {
    "NPA": 530,
    "TZ": "PST"
  },
  {
    "NPA": 531,
    "TZ": "CST"
  },
  {
    "NPA": 534,
    "TZ": "CST"
  },
  {
    "NPA": 539,
    "TZ": "CST"
  },
  {
    "NPA": 540,
    "TZ": "EST"
  },
  {
    "NPA": 541,
    "TZ": "PST"
  },
  {
    "NPA": 551,
    "TZ": "EST"
  },
  {
    "NPA": 559,
    "TZ": "PST"
  },
  {
    "NPA": 561,
    "TZ": "EST"
  },
  {
    "NPA": 562,
    "TZ": "PST"
  },
  {
    "NPA": 563,
    "TZ": "CST"
  },
  {
    "NPA": 564,
    "TZ": "PST"
  },
  {
    "NPA": 567,
    "TZ": "EST"
  },
  {
    "NPA": 570,
    "TZ": "EST"
  },
  {
    "NPA": 571,
    "TZ": "EST"
  },
  {
    "NPA": 573,
    "TZ": "CST"
  },
  {
    "NPA": 574,
    "TZ": "CST"
  },
  {
    "NPA": 575,
    "TZ": "MST"
  },
  {
    "NPA": 580,
    "TZ": "CST"
  },
  {
    "NPA": 585,
    "TZ": "EST"
  },
  {
    "NPA": 586,
    "TZ": "EST"
  },
  {
    "NPA": 601,
    "TZ": "CST"
  },
  {
    "NPA": 602,
    "TZ": "MST"
  },
  {
    "NPA": 603,
    "TZ": "EST"
  },
  {
    "NPA": 605,
    "TZ": "MST"
  },
  {
    "NPA": 606,
    "TZ": "CST"
  },
  {
    "NPA": 607,
    "TZ": "EST"
  },
  {
    "NPA": 608,
    "TZ": "CST"
  },
  {
    "NPA": 609,
    "TZ": "EST"
  },
  {
    "NPA": 610,
    "TZ": "EST"
  },
  {
    "NPA": 612,
    "TZ": "CST"
  },
  {
    "NPA": 614,
    "TZ": "EST"
  },
  {
    "NPA": 615,
    "TZ": "CST"
  },
  {
    "NPA": 616,
    "TZ": "EST"
  },
  {
    "NPA": 617,
    "TZ": "EST"
  },
  {
    "NPA": 618,
    "TZ": "CST"
  },
  {
    "NPA": 619,
    "TZ": "PST"
  },
  {
    "NPA": 620,
    "TZ": "MST"
  },
  {
    "NPA": 623,
    "TZ": "MST"
  },
  {
    "NPA": 626,
    "TZ": "PST"
  },
  {
    "NPA": 628,
    "TZ": "PST"
  },
  {
    "NPA": 629,
    "TZ": "CST"
  },
  {
    "NPA": 630,
    "TZ": "CST"
  },
  {
    "NPA": 631,
    "TZ": "EST"
  },
  {
    "NPA": 636,
    "TZ": "CST"
  },
  {
    "NPA": 640,
    "TZ": "EST"
  },
  {
    "NPA": 641,
    "TZ": "CST"
  },
  {
    "NPA": 646,
    "TZ": "EST"
  },
  {
    "NPA": 650,
    "TZ": "PST"
  },
  {
    "NPA": 651,
    "TZ": "CST"
  },
  {
    "NPA": 657,
    "TZ": "PST"
  },
  {
    "NPA": 660,
    "TZ": "CST"
  },
  {
    "NPA": 661,
    "TZ": "PST"
  },
  {
    "NPA": 662,
    "TZ": "CST"
  },
  {
    "NPA": 667,
    "TZ": "EST"
  },
  {
    "NPA": 669,
    "TZ": "PST"
  },
  {
    "NPA": 678,
    "TZ": "EST"
  },
  {
    "NPA": 680,
    "TZ": "EST"
  },
  {
    "NPA": 681,
    "TZ": "EST"
  },
  {
    "NPA": 682,
    "TZ": "CST"
  },
  {
    "NPA": 701,
    "TZ": "MST"
  },
  {
    "NPA": 702,
    "TZ": "PST"
  },
  {
    "NPA": 703,
    "TZ": "EST"
  },
  {
    "NPA": 704,
    "TZ": "EST"
  },
  {
    "NPA": 706,
    "TZ": "EST"
  },
  {
    "NPA": 707,
    "TZ": "PST"
  },
  {
    "NPA": 708,
    "TZ": "CST"
  },
  {
    "NPA": 712,
    "TZ": "CST"
  },
  {
    "NPA": 713,
    "TZ": "CST"
  },
  {
    "NPA": 714,
    "TZ": "PST"
  },
  {
    "NPA": 715,
    "TZ": "CST"
  },
  {
    "NPA": 716,
    "TZ": "EST"
  },
  {
    "NPA": 717,
    "TZ": "EST"
  },
  {
    "NPA": 718,
    "TZ": "EST"
  },
  {
    "NPA": 719,
    "TZ": "MST"
  },
  {
    "NPA": 720,
    "TZ": "MST"
  },
  {
    "NPA": 724,
    "TZ": "EST"
  },
  {
    "NPA": 725,
    "TZ": "PST"
  },
  {
    "NPA": 726,
    "TZ": "CST"
  },
  {
    "NPA": 727,
    "TZ": "EST"
  },
  {
    "NPA": 731,
    "TZ": "CST"
  },
  {
    "NPA": 732,
    "TZ": "EST"
  },
  {
    "NPA": 734,
    "TZ": "EST"
  },
  {
    "NPA": 737,
    "TZ": "CST"
  },
  {
    "NPA": 740,
    "TZ": "EST"
  },
  {
    "NPA": 743,
    "TZ": "EST"
  },
  {
    "NPA": 747,
    "TZ": "PST"
  },
  {
    "NPA": 754,
    "TZ": "EST"
  },
  {
    "NPA": 757,
    "TZ": "EST"
  },
  {
    "NPA": 760,
    "TZ": "PST"
  },
  {
    "NPA": 762,
    "TZ": "EST"
  },
  {
    "NPA": 763,
    "TZ": "CST"
  },
  {
    "NPA": 765,
    "TZ": "EST"
  },
  {
    "NPA": 769,
    "TZ": "CST"
  },
  {
    "NPA": 770,
    "TZ": "EST"
  },
  {
    "NPA": 772,
    "TZ": "EST"
  },
  {
    "NPA": 773,
    "TZ": "CST"
  },
  {
    "NPA": 774,
    "TZ": "EST"
  },
  {
    "NPA": 775,
    "TZ": "PST"
  },
  {
    "NPA": 779,
    "TZ": "CST"
  },
  {
    "NPA": 781,
    "TZ": "EST"
  },
  {
    "NPA": 785,
    "TZ": "MST"
  },
  {
    "NPA": 786,
    "TZ": "EST"
  },
  {
    "NPA": 801,
    "TZ": "MST"
  },
  {
    "NPA": 802,
    "TZ": "EST"
  },
  {
    "NPA": 803,
    "TZ": "EST"
  },
  {
    "NPA": 804,
    "TZ": "EST"
  },
  {
    "NPA": 805,
    "TZ": "PST"
  },
  {
    "NPA": 806,
    "TZ": "CST"
  },
  {
    "NPA": 810,
    "TZ": "EST"
  },
  {
    "NPA": 812,
    "TZ": "CST"
  },
  {
    "NPA": 813,
    "TZ": "EST"
  },
  {
    "NPA": 814,
    "TZ": "EST"
  },
  {
    "NPA": 815,
    "TZ": "CST"
  },
  {
    "NPA": 816,
    "TZ": "CST"
  },
  {
    "NPA": 817,
    "TZ": "CST"
  },
  {
    "NPA": 818,
    "TZ": "PST"
  },
  {
    "NPA": 820,
    "TZ": "PST"
  },
  {
    "NPA": 828,
    "TZ": "EST"
  },
  {
    "NPA": 830,
    "TZ": "CST"
  },
  {
    "NPA": 831,
    "TZ": "PST"
  },
  {
    "NPA": 832,
    "TZ": "CST"
  },
  {
    "NPA": 838,
    "TZ": "EST"
  },
  {
    "NPA": 843,
    "TZ": "EST"
  },
  {
    "NPA": 845,
    "TZ": "EST"
  },
  {
    "NPA": 847,
    "TZ": "CST"
  },
  {
    "NPA": 848,
    "TZ": "EST"
  },
  {
    "NPA": 850,
    "TZ": "CST"
  },
  {
    "NPA": 854,
    "TZ": "EST"
  },
  {
    "NPA": 856,
    "TZ": "EST"
  },
  {
    "NPA": 857,
    "TZ": "EST"
  },
  {
    "NPA": 858,
    "TZ": "PST"
  },
  {
    "NPA": 859,
    "TZ": "EST"
  },
  {
    "NPA": 860,
    "TZ": "EST"
  },
  {
    "NPA": 862,
    "TZ": "EST"
  },
  {
    "NPA": 863,
    "TZ": "EST"
  },
  {
    "NPA": 864,
    "TZ": "EST"
  },
  {
    "NPA": 865,
    "TZ": "EST"
  },
  {
    "NPA": 870,
    "TZ": "CST"
  },
  {
    "NPA": 872,
    "TZ": "CST"
  },
  {
    "NPA": 878,
    "TZ": "EST"
  },
  {
    "NPA": 901,
    "TZ": "CST"
  },
  {
    "NPA": 903,
    "TZ": "CST"
  },
  {
    "NPA": 904,
    "TZ": "EST"
  },
  {
    "NPA": 906,
    "TZ": "CST"
  },
  {
    "NPA": 908,
    "TZ": "EST"
  },
  {
    "NPA": 909,
    "TZ": "PST"
  },
  {
    "NPA": 910,
    "TZ": "EST"
  },
  {
    "NPA": 912,
    "TZ": "EST"
  },
  {
    "NPA": 913,
    "TZ": "CST"
  },
  {
    "NPA": 914,
    "TZ": "EST"
  },
  {
    "NPA": 915,
    "TZ": "MST"
  },
  {
    "NPA": 916,
    "TZ": "PST"
  },
  {
    "NPA": 917,
    "TZ": "EST"
  },
  {
    "NPA": 918,
    "TZ": "CST"
  },
  {
    "NPA": 919,
    "TZ": "EST"
  },
  {
    "NPA": 920,
    "TZ": "CST"
  },
  {
    "NPA": 925,
    "TZ": "PST"
  },
  {
    "NPA": 928,
    "TZ": "MST"
  },
  {
    "NPA": 929,
    "TZ": "EST"
  },
  {
    "NPA": 930,
    "TZ": "EST"
  },
  {
    "NPA": 931,
    "TZ": "CST"
  },
  {
    "NPA": 934,
    "TZ": "EST"
  },
  {
    "NPA": 936,
    "TZ": "CST"
  },
  {
    "NPA": 937,
    "TZ": "EST"
  },
  {
    "NPA": 938,
    "TZ": "CST"
  },
  {
    "NPA": 940,
    "TZ": "CST"
  },
  {
    "NPA": 941,
    "TZ": "EST"
  },
  {
    "NPA": 947,
    "TZ": "EST"
  },
  {
    "NPA": 949,
    "TZ": "PST"
  },
  {
    "NPA": 951,
    "TZ": "PST"
  },
  {
    "NPA": 952,
    "TZ": "CST"
  },
  {
    "NPA": 954,
    "TZ": "EST"
  },
  {
    "NPA": 956,
    "TZ": "CST"
  },
  {
    "NPA": 959,
    "TZ": "EST"
  },
  {
    "NPA": 970,
    "TZ": "MST"
  },
  {
    "NPA": 971,
    "TZ": "PST"
  },
  {
    "NPA": 972,
    "TZ": "CST"
  },
  {
    "NPA": 973,
    "TZ": "EST"
  },
  {
    "NPA": 978,
    "TZ": "EST"
  },
  {
    "NPA": 979,
    "TZ": "CST"
  },
  {
    "NPA": 980,
    "TZ": "EST"
  },
  {
    "NPA": 984,
    "TZ": "EST"
  },
  {
    "NPA": 985,
    "TZ": "CST"
  },
  {
    "NPA": 986,
    "TZ": "PST"
  },
  {
    "NPA": 989,
    "TZ": "EST"
  },
  {
    "NPA": 123,
    "TZ": "ZZZ"
  },
  {
    "NPA": 456,
    "TZ": "PST"
  },
  {
    "NPA": 666,
    "TZ": "CST"
  },
  {
    "NPA": 750,
    "TZ": "MST"
  },
  {
    "NPA": 987,
    "TZ": "EST"
  },
  {
    "NPA": 546,
    "TZ": "MST"
  },
  {
    "NPA": 345,
    "TZ": "MST"
  },
  {
    "NPA": 387,
    "TZ": "PST"
  },
  {
    "NPA": 514,
    "TZ": "EST"
  }
]