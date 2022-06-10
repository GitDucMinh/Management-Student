class LOP{
    constructor(malop, tenlop) {
        this.__malop = malop;
        this.__tenlop = tenlop; 
    }

    set malop(value) { this.__malop = value; }
    get malop() { return this.__malop; }

    set tenlop(value) { this.__tenlop = value; }
    get tenlop() { return this.__tenlop; }
}