<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-input class="item-form" v-model="form.original" placeholder="Url to shorten"></b-form-input>
      <b-form-input
        class="item-form"
        v-model="form.customShortenedUrl"
        placeholder="Custom url to use as shorten url"
      ></b-form-input>
      <b-button class="item-form" type="submit" variant="outline-primary">Shorten</b-button>

      <b-form-input
        class="item-form-2"
        v-model="shortened"
        placeholder="Custom url to use as shorten url"
      ></b-form-input>
    </b-form>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Url",
  data: () => ({
    form: {
      original: "http://g1.com.br",
      customShortenedUrl: null
    }
  }),
  computed: mapState(["shortened"]),
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch({
        type: "shorten",
        url: this.form
      });
    }
  }
};
</script>
<style>
form {
  display: block;
  margin-top: 0em;
}
.item-form {
  margin-top: 1rem;
}
.item-form-2 {
  margin-top: 2rem;
}
</style>