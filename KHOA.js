class KHOA {
    constructor(makhoa, tenkhoa) {
        this.__makhoa = makhoa;
        this.__tenkhoa = tenkhoa;
    }

    set makhoa(value) { this.__makhoa = value; }
    get makhoa() { return this.__makhoa; }

    set tenkhoa(value) { this.__tenkhoa = value; }
    get tenkhoa() { return this.__tenkhoa; }
}