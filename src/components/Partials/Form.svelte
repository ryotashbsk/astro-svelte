<script lang="ts">
  import { formConfig } from '@config';

  import Input from './Input.svelte';

  let formData: {
    [key: string]: {
      value: string | string[];
      error: string;
    };
  } = {};

  let errorCount: {
    [key: string]: string;
  } = {};

  let isError = true;

  const getInputData = (
    e: {
      detail: {
        value: string | string[];
        error: string;
      };
    },
    n: string
  ) => {
    formData[n] = e.detail;

    if (e.detail.error) {
      errorCount[n] = e.detail.error;
    } else {
      delete errorCount[n];
    }

    isError = Object.keys(errorCount).length == 0 ? false : true;

    console.log(formData);
  };

  const submit = async () => {
    if (!isError) {
      const mailBody = formConfig.map((v) => {
        const value = formData[`${v.name}`]?.value;
        return {
          label: v.label,
          value: Array.isArray(value) ? value.join(',') : value
        };
      });
      console.log(mailBody);
    }
  };
</script>

<form name="myForm">
  {#each formConfig as item}
    {#if item.label}
      <div class="item">
        <label class="label" for={item.name}>
          {item.label}
          {#if item.required}
            <span class="requiredIcon">*</span>
          {/if}
        </label>

        <div class="input is-{item.type} is-{item.name}">
          <Input
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            inputmode={item.inputmode}
            checkboxes={item.checkboxes}
            radios={item.radios}
            selects={item.selects}
            required={item.required}
            on:getInputData={(e) => {
              getInputData(e, item.name);
            }}
          />
        </div>
      </div>
    {/if}
  {/each}

  <button type="submit" class="button" class:is-enable={!isError} on:click|preventDefault={submit}>送信</button>
</form>

<style lang="scss">
  @import '../../styles/import';

  form {
    width: 500px;
    padding: 30px;
    margin: 0 auto;
    line-height: 1;
    background-color: #f3f3f3;
    border-radius: 20px;
  }

  .item {
    margin-bottom: 2em;
  }

  .requiredIcon {
    color: red;
  }

  button {
    width: 60%;
    margin: 2em auto 0;
    font-weight: bold;
    line-height: 3;
    color: #fff;
    background-color: #999;
    border-radius: 3px;

    &:hover {
      opacity: 0.5;
    }
  }
</style>
