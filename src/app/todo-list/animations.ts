import { animate, animateChild, query, stagger, style, transition, trigger } from "@angular/animations";

export const animations = [
  trigger("list", [
    transition(":enter", [
      query("@element", stagger(100, animateChild()))
    ]),
  ]),
  trigger("element", [
    transition(":enter", [
      style({ transform: "scale(0.2)", opacity: 0, height: 0, margin: 0 }),
      animate("500ms ease", 
              style({ transform: "scale(1)", opacity: 1, height: "*", margin: "*" }))
    ]),
    transition(":leave", [
      style({ transform: "scale(1)", opacity: 1, height: "*" }),
      animate("1s cubic-bezier(.8, -0.6, 0.2, 1.5)", 
              style({ 
                transform: "scale(0.1)", opacity: 0, 
                height: "0px", margin: "0px", padding: "0px"
              })) 
    ])
  ])
];
