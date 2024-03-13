import { Button, Heading } from '@/_components/ui'
import { Container } from '../Container'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: null,
  },
}

export const ContainerWithHeading: Story = {
  args: {
    children: (
      <div className='h-[400px]'>
        <Heading
          title='Account'
          buttonComponent={() => <Button variant={'outline'}>Edit</Button>}
        />
        <div className='pt-8'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aut
          earum velit pariatur minus quam necessitatibus obcaecati aperiam quae,
          aliquid iste consequatur. Architecto, aspernatur repudiandae quis
          minus fuga laudantium cumque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dicta aut earum velit pariatur minus quam
          necessitatibus obcaecati aperiam quae, aliquid iste consequatur.
          Architecto, aspernatur repudiandae quis minus fuga laudantium cumque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aut
          earum velit pariatur minus quam necessitatibus obcaecati aperiam quae,
          aliquid iste consequatur. Architecto, aspernatur repudiandae quis
          minus fuga laudantium cumque.
        </div>
      </div>
    ),
  },
}
