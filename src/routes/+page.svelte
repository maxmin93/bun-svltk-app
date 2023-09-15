<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1 class="text-3xl font-bold underline">Hello, SvelteKit!</h1>
<div data-theme="cupcake" class="mt-4">
  <h2>Users</h2>
  <ul class="list-disc ml-4 mt-4">
    {#each data.users as user (user.id)}
    <li>{user.fullName} ({user.phone})</li>
    {/each}
  </ul>
</div>