<script>
  const currentTemperature = 7;
  let hover = null;
  let target = null;
  let increments = new Array(60).fill(false);
  let mode = "Hors gel";
  let warming = false;

  $: {
    if (target) {
      mode = "En chauffe";
      warming = true;
    }
  }

  const handleTouchMove = evt => {
    if (!evt.touches[0]) return;
    if (!!target) target = null;
    const elem = document.elementFromPoint(
      evt.touches[0].clientX,
      evt.touches[0].clientY
    );
    if (elem.parentNode.children.length !== 60) return;
    const index = [...elem.parentNode.children].indexOf(elem);
    hover = index;
  };

  const handleTouchEnd = evt => {
    target = hover;
    hover = null;
  };
</script>

<style>
  :root {
    --white: #fff;
    --primary: #4f5861;
    --dark-gray: #39424b;
    --gray: #f2f2f2;
    --cold:  var(--dark-gray);
    --orange: #bd6311;
    --max-temp: #BD3A11;
    --header-height: 60px;
    --padding: 20px;
  }

  header {
    position: fixed;
    height: var(--header-height);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-shadow: 0px 0 20px rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .background {
    width: calc(60*100vw);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(left, var(--cold) 0%, var(--orange) 60%, var(--max-temp) 100%)
  }

  header h1 {
    line-height: var(--header-height);
    margin: 0;
    padding: 0;
    padding-left: var(--padding);
    color: var(--white);
    font-weight: 400;
  }

  main {
    position: fixed;
    top: var(--header-height);
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--dark-gray);
    transition: background-color .3s ease-in-out;
  }
  main.warming {
    background: var(--orange);
  }

  .grid {
    display: grid;
    grid-template-rows: 1fr auto 1fr;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
  }

  .humidity {
    font-size: 20px;
    color: var(--gray);
    display: block;
  }
  .humidity .number {
    font-size: 25px;
    display: block;
  }

  .temperature {
    font-size: 40px;
    color: var(--white);
    display: block;
    margin-top: auto;
  }

  .temperature .number {
    font-size: 120px;
    display: block;
  }

  .thermostat {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    width: calc(100vw - 2 * var(--padding));
    border: 2px solid var(--primary);
    padding: 4px 1px;
  }

  .thermostat .increment {
    display: block;
    width: 1px;
    height: 44px;
    background: linear-gradient(
      180deg,
      rgba(196, 196, 196, 0) 0%,
      rgba(196, 196, 196, 0.6) 43.23%
    );
  }

  .thermostat .increment.hover {
    background: var(--white);
    width: 2px;
    height: 46px;
    position: relative;
  }
  .thermostat .increment .value {
    display: none;
  }

  .thermostat .increment.current {
    background: var(--white);
    width: 2px;
    height: 46px;
    position: relative;
  }
  .thermostat .increment .current-value {
    position: absolute;
    top: -40px;
    color: var(--white);
    font-size: 20px;
  }

  .thermostat .increment.target {
    width: 2px;
    position: relative;
  }
  .thermostat .increment.target::before {
    content: "";
    position: absolute;
    top: -10px;
    bottom: 0;
    width: 4px;
    left: 0;
    background: var(--white);
  }

  .thermostat .increment .target-value {
    position: absolute;
    top: -50px;
    color: var(--white);
    font-size: 30px;
  }
</style>

<header>
  <h1>Baroussette</h1>
</header>
<main>
  <div class="background"></div>
  <div class="grid">
    <section class="humidity">
      humidite
      <span class="number">50%</span>
    </section>
    <section class="temperature">
      Hors gel
      <span class="number">7</span>
    </section>

    <section
      class="thermostat"
      on:touchstart={handleTouchMove}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}>
      {#each increments as increment, i}
        <div
          class="increment"
          class:hover={i === hover}
          class:target={i === target}
          class:current={i / 2 === currentTemperature}>
          {#if i / 2 === currentTemperature || hover === i}
            <div class="current-value">{i / 2}</div>
          {:else if i === target}
            <div class="target-value">{i / 2}</div>
          {:else}
            <div class="value">{i / 2}</div>
          {/if}
        </div>
      {/each}
    </section>
  </div>
</main>
