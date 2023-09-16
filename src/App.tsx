import { useMachine } from "@xstate/react";
import { createMachine, assign } from "xstate";
import { produce } from "immer";

type ContextType = {
  value: number | string;
  otherProp?: string;
};

const initialContext: ContextType = {
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
          actions: assign((context) => {
            delete context.otherProp;
            return (context.value = "one");
          }),
        },
      },
    },
    string: {
      on: {
        TOGGLE: {
          target: "number",
          actions: assign((context) => {
            // return (context.type = "number"), (context.value = 1);
            context = { value: 1, otherProp: "otherProp" };
            return context;
          }),
          // actions: assign({
          //   type: "number",
          //   value: 1,
          //   otherProp: "otherProp",
          // }),
        },
      },
    },
  },
  predictableActionArguments: true,
});

export function TypesMachineComponent() {
  const [state, send] = useMachine(typesMachine);

  return (
    <div>
      <div>Type:</div>
      <div>{JSON.stringify(state.value)}</div>
      <div>Context:</div>
      <div>{JSON.stringify(state.context.value)}</div>
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
