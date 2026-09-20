# AddBounceExpression 🏀

A tiny After Effects script that drops an **inertial bounce** (overshoot) expression onto every selected property. Keyframe the move, hit the hotkey, get the wobble.

## What it does

Select one or more keyframed properties in the timeline, run the script, and each one gets a bounce expression:

- After every keyframe, the value **overshoots and settles** — a decaying sine wave driven by the speed the property was travelling when it hit the key.
- Faster move in = bigger bounce. No movement = no bounce.
- Works on anything that can take an expression: Position, Scale, Rotation, effect sliders, shape properties…
- Any number of properties across any number of layers, in one undo step.

```
value
  │        ╭╮
  │       ╱  ╲  ╭─╮
  │      ╱    ╰─╯  ╰────────   ← overshoots, then settles
  │     ╱
  │────╯
  └──────◆─────────────────── time
       keyframe
```

## Installation

### As a Regular Script
- Place `AddBounceExpression.jsx` in your **Scripts** folder and run via **File → Scripts → AddBounceExpression.jsx**:
  ```
  Windows: C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\
  macOS:   /Applications/Adobe After Effects [version]/Scripts/
  ```

### As a Hotkey (recommended)
- Keep the `.jsx` anywhere and trigger it from your hotkey tool of choice, e.g. AutoHotkey:
  ```ahk
  run, "<path-to-AfterFX.exe>" -r "C:\path\to\AddBounceExpression.jsx"
  ```

## Usage

1. **Keyframe a property** (at least two keys, so it's actually moving into the last one).
2. **Select the property** in the timeline — click its name, e.g. *Position*. Select as many as you like.
3. **Run the script.**
4. **Done!** Scrub past a keyframe to see the bounce.

## Tweaking the bounce

Open the expression on the property and change the three numbers:

| Variable | Default | What it does |
|---|---|---|
| `amp` | `.03` | How big the overshoot is |
| `freq` | `1.0` | Bounces per second |
| `decay` | `8.0` | How quickly it settles (higher = dies faster) |

To change the defaults for every future use, edit the same three lines inside the script's `bounceExpr` block.

## Notes

- The bounce only plays for **1 second after each keyframe**; outside that window the property is left at its keyframed value.
- Running it **replaces** any expression already on the selected properties.
- Linear or fast-in keyframes bounce best — an Easy Ease in arrives at zero speed, so there's nothing to overshoot.
- If nothing is selected you get a single reminder dialog.

## Requirements

- Adobe After Effects (any version with scripting support)

## Credits

The bounce itself is the classic **inertial bounce expression by Dan Ebberts** ([motionscript.com](https://www.motionscript.com/)) — this script just applies it for you in one keypress.

## License

MIT
