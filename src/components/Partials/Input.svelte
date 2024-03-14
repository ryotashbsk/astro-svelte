<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let name;
  export let type = 'text';
  export let placeholder;
  export let inputmode;
  export let selects;
  export let checkboxes;
  export let radios;
  export let required;

  let value = '';

  if (type == 'checkbox') {
    value = [];
  }

  let isError = true;
  let isEmpty = false;
  let isInvalid = false;
  let selected = '';

  const onChange = (e) => {
    isInvalid = false;

    if (type == 'tel' && ~value.indexOf('-')) {
      value = value.replace('-', '');
    }

    if (type == 'radio' || name == 'email') {
      value = e.currentTarget.value;
    }

    if (type == 'checkbox') {
      if (value.some((el) => el == e.currentTarget.value)) {
        const idx = value.indexOf(e.currentTarget.value);
        value.splice(idx, 1);
      } else {
        value.push(e.currentTarget.value);
        value = Array.from(new Set(value));
      }
    }

    checkEmpty();
    dispatcher();
  };

  const onCut = () => {
    checkEmpty();
    dispatcher();
  };

  const onPaste = () => {
    checkEmpty();
    dispatcher();
  };

  const onBlur = () => {
    value = replaceFullToHalf(value);
    checkEmpty();
    checkRegex();
    dispatcher();
  };

  const checkRegex = () => {
    let regex;
    const regexes = {
      tel: /^0\d{9,10}$/,
      email:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };

    if (type == 'tel') {
      regex = new RegExp(regexes.tel);
    } else if (type == 'email') {
      regex = new RegExp(regexes.email);
    }

    if (regex) {
      isInvalid = !regex.test(value);
      isError = isInvalid ? true : false;
    }
  };

  const replaceFullToHalf = (str) => {
    if (str) {
      return str.replace(/[！-～]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
      });
    }
  };

  const checkEmpty = () => {
    if (required) {
      if ((type == 'select' && value == '選択して下さい') || (type == 'checkbox' && value.length == 0)) {
        isEmpty = true;
      } else {
        isEmpty = !value;
      }
      isError = isEmpty ? true : false;
    }
  };

  const dispatcher = () => {
    dispatch('getInputData', {
      value: value,
      error: isError
    });
  };

  onMount(async () => {
    if (!required) isError = false;
    dispatcher();
  });
</script>

{#if type == 'text'}
  <input
    type="text"
    {name}
    {inputmode}
    {required}
    {placeholder}
    bind:value
    on:change={onChange}
    on:input={onChange}
    on:cut={onCut}
    on:paste={onPaste}
    on:blur={onBlur}
  />
{:else if type == 'email'}
  <input
    type="email"
    {name}
    {inputmode}
    {required}
    {placeholder}
    bind:value
    on:change={onChange}
    on:input={onChange}
    on:cut={onCut}
    on:paste={onPaste}
    on:blur={onBlur}
  />
{:else if type == 'tel'}
  <input
    type="tel"
    {name}
    {inputmode}
    {required}
    {placeholder}
    bind:value
    on:change={onChange}
    on:input={onChange}
    on:cut={onCut}
    on:paste={onPaste}
    on:blur={onBlur}
  />
{:else if type == 'checkbox'}
  {#each checkboxes as item}
    <div class="checkbox">
      <label>
        <input {type} {name} {inputmode} {required} checked={selected === item} value={item} on:change={onChange} />
        <div class="checkbox-label">{item}</div>
      </label>
    </div>
  {/each}
{:else if type == 'radio'}
  {#each radios as item}
    <div class="radio">
      <label>
        <input {type} {name} {inputmode} {required} checked={selected === item} value={item} on:change={onChange} />
        <div class="radio-label">{item}</div>
      </label>
    </div>
  {/each}
{:else if type == 'textarea'}
  <textarea
    cols="30"
    rows="10"
    {name}
    {required}
    {placeholder}
    bind:value
    on:input={onChange}
    on:cut={onCut}
    on:paste={onPaste}
    on:blur={onBlur}
  />
{:else if type == 'select'}
  <div class="selectboxWrap">
    <select {name} {required} bind:value on:change={onChange} on:input={onChange} on:blur={onBlur}>
      <option selected="selected" value="選択して下さい">選択して下さい</option>
      {#each selects as item}
        <optgroup label={item.parent}>
          {#each item.child as _item}
            <option value={_item}>{_item}</option>
          {/each}
        </optgroup>
      {/each}
    </select>
  </div>
{:else if type == 'hidden'}
  <input type="hidden" {name} bind:value />
{/if}

{#if isEmpty}
  <div class="alert">※必須項目です</div>
{/if}

{#if !isEmpty && isInvalid}
  <div class="alert">※入力形式が正しくありません</div>
{/if}

<style lang="scss">
  @import '../../styles/import';

  input[type='text'],
  input[type='email'] {
    width: 100%;
    padding: 10px;
    margin-top: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  textarea {
    width: 100%;
    padding: 1em;
    margin-top: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  label {
    display: flex;
    column-gap: 0.5em;
    align-items: center;
  }

  .checkbox {
    margin-top: 1em;
  }

  .alert {
    margin: 0.5em 0 3em;
    font-size: 0.8rem;
    line-height: 1;
    color: red;
  }
</style>
