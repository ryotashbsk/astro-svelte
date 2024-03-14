<script lang="ts">
</script>

<form action="">
  <div>name</div>
  <input type="text" value="" />

  <div>email</div>
  <input type="email" value="" />

  <button type="submit">Send</button>
</form>

<style lang="scss">
  @import '../../styles/import';

  form {
    width: 500px;
    padding: 30px;
    margin: 0 auto;
    background-color: #f3f3f3;
    border-radius: 20px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
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
