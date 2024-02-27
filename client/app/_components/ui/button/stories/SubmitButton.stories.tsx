import type { Meta, StoryObj } from '@storybook/react';

import { SubmitButton } from '../SubmitButton';
import { useFormState } from 'react-dom';

const meta = {
  title: 'ui/SubmitButton',
  component: SubmitButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof SubmitButton>;

const Template: Story = {
  render: ({ actionText, pendingText, ...props }) => {
    const onSubmit = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: 'Success!' });
        }, 5000);
      });
    };
    const [state, formAction] = useFormState(onSubmit, { message: null });

    return (
      <form action={formAction}>
        <SubmitButton
          actionText={actionText}
          pendingText={pendingText}
          {...props}
        />
      </form>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    actionText: 'Submit',
  },
};
