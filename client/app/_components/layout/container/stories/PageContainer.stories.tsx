import { Heading } from '@/_components/ui'
import { PageContainer } from '../PageContainer'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'layout/Container/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Heading title='Rule' />
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
      </>
    ),
  },
}
