// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import {ButtonComponent} from '../app/micro/button/button.component';

export default {
  title: 'Micro Component/Button',
  component: ButtonComponent,
  argTypes: {
    hoverable: { control: 'boolean'},
    type: { control: {type: 'select', options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'link']} },
    color: { control: { type: 'select', options: ['', 'pink', 'purple', 'deep-purple', 'indigo', 'light-blue', 'cyan', 'dark-green', 'light-green', 'yellow', 'amber', 'deep-orange', 'brown', 'blue-grey']} },
    size: { control: 'text' },
    prefixIcon: { control: 'text' },
    sufixIcon: { control: 'text' },
    additionalClasses: { control: 'text' },
    bold: { control: 'boolean' }
  },
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  component: ButtonComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  size: '100',
  label: 'Primary',
  type: 'primary',
  bold: 'true',
  hoverable: true
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: '100',
  label: 'Secondary',
  type: 'secondary',
  color: 'indigo',
  hoverable: true
};
