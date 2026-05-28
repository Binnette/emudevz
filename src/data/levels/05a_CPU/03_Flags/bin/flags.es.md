# Banderas

El **registro de banderas**, también llamado **estado del procesador** (o simplemente **P**), guarda varias banderas de CPU en `1` byte:

```raw
 _______________________________
| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|
| N | V | 1 | b | D | I | Z | C |
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
```

| Bit | Bandera | Descripción |
| --- | ------- | ----------- |
| `0` | `Carry` | Se enciende cuando la aritmética sin signo supera `255`, o cuando una resta no necesita tomar prestado. También se usa en desplazamientos y rotaciones. |
| `1` | `Zero` | Se enciende cuando el último resultado es `0`. |
| `2` | `Interrupt Disable` | Cuando está encendida, las interrupciones enmascarables (`IRQ`) están deshabilitadas. |
| `3` | `Decimal` | Activa el modo decimal en un 6502 normal, pero no se usa en la NEEES. |
| `4` | `b` | No es una bandera real, pero dependiendo del origen, este bit se pondrá en la pila como `1` o `0`. Las interrupciones por software (`BRK`) y las instrucciones `PHP` pondrán la bandera `b` como `1`. Las interrupciones de hardware (`IRQ` y `NMI`) pondrán la bandera `b` como `0`. |
| `5` | `1` | No es una bandera real. Siempre es `1`. |
| `6` | `Overflow` | Se enciende cuando una operación aritmética desborda en matemática con signo, como `Positivo + Positivo = Negativo` o `Negativo + Negativo = Positivo`. |
| `7` | `Negative` | Se enciende cuando el último resultado tiene el bit `7` encendido (número negativo). |
