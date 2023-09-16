import { useMachine } from "@xstate/react";
import { createMachine, assign } from "xstate";

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
            context = { value: 1, otherProp: "otherProp" };
            return context;
          }),
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
      <div>State:</div>
      <div>{JSON.stringify(state.value)}</div>
      <div>Value:</div>
      <div>{JSON.stringify(state.context.value)}</div>
      {state.context.otherProp && (
        <>
          <div>OtherProp:</div>
          <div>{JSON.stringify(state.context?.otherProp)}</div>
        </>
      )}
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
