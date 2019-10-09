<template>
  <b-container fluid>
    <b-row class="text-center title">
      <b-col md="6" offset-md="3">
        <h1>Urlzinha</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        md="12"
        class="text-center"
      >This is Urlzinha, a app to shorten urls. Urlzinha in portuguese mean's something like 'small url' =D</b-col>
    </b-row>
    <b-row align-h="center" class="form">
      <b-col md="6">
        <Url />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Url from "../components/url/Url";

export default {
  name: "Home",
  components: {
    Url
  }
};
</script>
<style>
.title {
  margin-top: 3em;
  margin-bottom: 2em;
}
.form {
  margin-top: 3em;
}
</style>