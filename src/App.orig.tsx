import { useMachine } from "@xstate/react";
import { createMachine, assign } from "xstate";

type ContextType =
  | {
      state: "number";
      value: number;
      otherProp: string;
    }
  | {
      state: "string";
      value: string;
    };

const initialContext: ContextType = {
  state: "number",
  value: 1,
  otherProp: "otherProp",
};

export const typesMachine = createMachine({
  tsTypes: {} as import("./App.typegen").Typegen0,
  context: initialContext,
  initial: "number",
  states: {
    number: {
      on: {
        TOGGLE: {
          target: "string",
          actions: assign({
            state: "string",
            value: "one",
          }),
        },
      },
    },
    string: {
      on: {
        TOGGLE: {
          target: "number",
          actions: assign({
            state: "number",
            value: 1,
            otherProp: "otherProp",
          }),
        },
      },
    },
  },
});

export function TypesMachineComponent() {
  const [state, send] = useMachine(typesMachine);

  return (
    <div>
      <div>State:</div>
      <div>{JSON.stringify(state.value)}</div>
      <div>Context:</div>
      <div>{JSON.stringify(state.context)}</div>
      <button
        onClick={() =>
          send({
            type: "TOGGLE",
          })
        }
      >
        TOGGLE
      </button>
    </div>
  );
}

export default function App() {
  return TypesMachineComponent();
}
