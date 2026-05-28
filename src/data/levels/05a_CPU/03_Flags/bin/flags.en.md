# Flags

The **flags register**, also called **processor status** (or just **P**), holds several CPU flags in `1` byte:

```raw
 _______________________________
| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|
| N | V | 1 | b | D | I | Z | C |
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
```

| Bit | Flag | Description |
| --- | ---- | ----------- |
| `0` | `Carry` | Set when unsigned arithmetic carries past `255`, or when a subtraction doesn't need to borrow. It is also used by shifts and rotates. |
| `1` | `Zero` | Set when the last result is `0`. |
| `2` | `Interrupt Disable` | When set, maskable interrupts (`IRQ`) are disabled. |
| `3` | `Decimal`  | Enables decimal mode on a normal 6502, but unused on the NEEES. |
| `4` | `b` | Not a real flag, but depending on the source, this bit will be pushed to the stack as either `1` or `0`. Software interrupts (`BRK`) and `PHP` instructions will push the `b` flag as being `1`. Hardware interrupts (`IRQ` and `NMI`) will push the `b` flag as being `0`. |
| `5` | `1` | Not a real flag. Always `1`. |
| `6` | `Overflow` | Set when an arithmetic operation overflows in signed math, like `Positive + Positive = Negative` or `Negative + Negative = Positive`. |
| `7` | `Negative` | Set when the last result has bit `7` set (negative number). |
