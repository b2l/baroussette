<script>
  export let temp;
  let tempInteger;
  let tempFloat;
  $: {
    tempInteger = Math.trunc(temp);
    tempFloat = (temp - tempInteger) * 10;
  }
</script>

<style>
  .superscript {
    position: relative;
    top: -0.8em;
    font-size: 50%;
  }
  .number {
    font-size: 3em;
    display: block;
  }
</style>

<span class="number">
  {#if tempInteger && tempFloat !== 0}
    {tempInteger}<span class="superscript">{tempFloat}</span>
  {:else}
    {temp}
  {/if}
</span>
