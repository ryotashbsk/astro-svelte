export const siteName = 'SITE NAME';
export const defaultDescription = '';

interface FormConfig {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  checkboxes?: string[];
  radios?: string[];
  selects?: string[];
  inputmode?: string;
}

export const formConfig: FormConfig[] = [
  {
    name: 'subject',
    label: 'お問い合わせ内容',
    type: 'checkbox',
    checkboxes: ['種別A', '種別B'],
    required: true
  },
  {
    name: 'name',
    label: 'お名前',
    type: 'text',
    required: true,
    placeholder: ''
  },
  {
    name: 'email',
    label: 'E-mail アドレス',
    type: 'email',
    required: true,
    placeholder: ''
  },
  // {
  //   name: 'tel',
  //   label: '電話番号',
  //   type: 'tel',
  //   required: true,
  //   placeholder: ''
  // },
  {
    name: 'message',
    label: 'お問い合わせ内容',
    type: 'textarea',
    required: true,
    placeholder: ''
  }
];
