<script>
  import Temperature from "./Temperature.svelte";

  const currentTemperature = 7;
  const frozeControlTemp = 7;
  let target = null;
  let increments = new Array(60).fill(false).map((_value, key) => key / 2);
  let mode = "Hors gel";
  let warming = false;
  let tempColor = "var(--cold)";
  let targetInteger;
  let targetFloat;

  $: {
    tempColor =
      target && target > frozeControlTemp ? "var(--orange)" : "var(--cold)";
  }

  const handleTouchMove = evt => {
    if (!evt.touches[0]) return;
    const elem = document.elementFromPoint(
      evt.touches[0].clientX,
      evt.touches[0].clientY
    );
    if (elem.parentNode.children.length !== 60) return;
    const index = [...elem.parentNode.children].indexOf(elem);
    target = index / 2;
    if (target < frozeControlTemp)
    target = frozeControlTemp
  };

  const handleTouchEnd = evt => {
    warming = target && target;
  };
</script>

<style>
  :root {
    --white: #fff;
    --primary: #4f5861;
    --dark-gray: #39424b;
    --gray: #f2f2f2;
    --cold: var(--dark-gray);
    --orange: #bd6311;
    --max-temp: #bd3a11;
    --header-height: 60px;
    --padding: 20px;
    --temp-color: var(--cold);
    --increment-thickness: 2px;
  }

  header {
    position: fixed;
    height: var(--header-height);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
  }

  .bg-temp {
    background: var(--temp-color);
    transition: background-color 0.3s ease-in-out;
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
    width: var(--increment-thickness);
    height: 44px;
    background: linear-gradient(
      180deg,
      rgba(196, 196, 196, 0) 0%,
      rgba(196, 196, 196, 0.6) 43.23%
    );
  }

  .thermostat .increment.disabled {
    opacity: .5;
  }

  .thermostat .increment.active {
    background: rgba(255, 255, 255, 0.8);
  }

  .thermostat .increment.current {
    background: var(--white);
    width: calc(2 * var(--increment-thickness));
    position: relative;
  }
  .thermostat .increment .current-value {
    position: absolute;
    bottom: 50px;
    color: var(--white);
    left: 5px;
    font-size: 9px;
  }

  .thermostat .increment.target {
    width: calc(2 * var(--increment-thickness));
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
    bottom: 50px;
    color: var(--white);
    font-size: 9px;
    left: 5px;
  }

  @media only screen and (orientation: landscape) {
    h1 {
      padding: 0;
    }
    .grid {
      grid-template-columns: 1fr 3fr 1fr;
      grid-template-rows: initial;
    }

    .temperature {
      margin-top: initial;
    }

    .thermostat {
      flex-direction: column-reverse;
      height: calc(100% - 2 * var(--padding));
      width: 50px;
      padding: 1px 4px;
      margin: var(--padding);
      margin-left: auto;
    }

    .thermostat .increment {
      height: var(--increment-thickness);
      width: 44px;
      background: linear-gradient(
        90deg,
        rgba(196, 196, 196, 0) 0%,
        rgba(196, 196, 196, 0.6) 43.23%
      );
    }

    .thermostat .increment.current {
      height: calc(2 * var(--increment-thickness));
      width: 44px;
    }
    .thermostat .increment .current-value {
      right: 60px;
      top: -3em;
      bottom: auto;
      left: auto;
    }

    .thermostat .increment.target {
      height: calc(2 * var(--increment-thickness));
    }
    .thermostat .increment.target::before {
      left: -10px;
      width: 54px;
      height: 4px;
      top: 0;
      background: var(--white);
    }

    .thermostat .increment .target-value {
      right: 20px;
      bottom: auto;
      left: auto;
    }
  }
  .main-temp {
    font-size: 40px;
  }
</style>

<header class="bg-temp" style="--temp-color:{tempColor}">
  <h1>Baroussette</h1>
</header>
<main class="bg-temp" style="--temp-color:{tempColor}">
  <div class="grid">
    <section class="humidity">
      humidite
      <span class="number">50%</span>
    </section>
    <section class="temperature main-temp">
      {#if warming}En chauffe{:else}Hors gel{/if}
      <Temperature temp={currentTemperature} />
    </section>

    <section
      class="thermostat"
      on:touchstart={handleTouchMove}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}>

      {#each increments as increment}
        <div
          class="increment"
          class:target={increment === target}
          class:current={increment === currentTemperature}
          class:disabled={increment < frozeControlTemp}
          class:active={increment > currentTemperature && increment < target}>
          {#if increment === currentTemperature}
            <div class="current-value">
              <Temperature temp={increment} />
            </div>
          {:else if increment === target}
            <div class="target-value">
              <Temperature temp={increment} />
            </div>
          {/if}
        </div>
      {/each}
    </section>
  </div>
</main>
