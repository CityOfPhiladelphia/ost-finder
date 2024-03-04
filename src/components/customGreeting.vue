<template>
  <div
    class="custom-greeting content"
  >
    <div
      id="main-area"
      class="main-area"
    >
      <h3>
        {{ $t('introPage.section1Title') }}
      </h3>

      <p v-html="$t('introPage.p0')" />
      <p v-html="$t('introPage.p1')" />

      <div class="has-text-centered container mb-1 mt-5">
        <button
          class="button open-list-button"
          @click="$emit('view-list')"
          v-html="$t('app.viewList')"
        />
      </div>

      <h3>
        {{ $t('introPage.section2Title') }}
      </h3>

      <p v-html="$t('introPage.p2')" />

      <ul>
        <li
          v-for="(item, index) in $config.i18n.data.messages['en-US'].introPage.ul1"
          :key="index"
          class="intro-list-item"
          v-html="$t('introPage.ul1.' + index)"
        />
      </ul>

      <h3>
        {{ $t('introPage.section3Title') }}
      </h3>

      <p v-html="$t('introPage.p3')" />

      <ul>
        <li
          v-for="(item, index) in $config.i18n.data.messages['en-US'].introPage.ul2"
          :key="index"
          class="intro-list-item"
          v-html="$t('introPage.ul2.' + index)"
        />
        <ul>
          <li
            v-for="(item, index) in $config.i18n.data.messages['en-US'].introPage.ul3"
            :key="index"
            class="intro-list-item"
            v-html="$t('introPage.ul3.' + index)"
          />
        </ul>
      </ul>

      <h3>
        {{ $t('introPage.section4Title') }}
      </h3>

      <ul>
        <li
          v-for="(item, index) in $config.i18n.data.messages['en-US'].introPage.ul4"
          :key="index"
          class="intro-list-item"
          v-html="$t('introPage.ul4.' + index)"
        />
      </ul>
    </div> <!-- end of main-area -->
  </div>
</template>

<script>

export default {
  name: 'CustomGreeting',
  props: {
    'message': {
      type: String,
      default: function() {
        return 'defaultMessage';
      },
    },
  },
  data() {
    let data = {
      sections: {},
      subsections: {},
    };
    return data;
  },
  computed: {
    allExceptions() {
      console.log('allExceptions computed is running');
      let exceptionsPreliminary = [];
      let exceptionFields = [
        'hours_mon_exceptions',
        'hours_tues_exceptions',
        'hours_wed_exceptions',
        'hours_thurs_exceptions',
        'hours_fri_exceptions',
        'hours_sat_exceptions',
        'hours_sun_exceptions',
      ];
      for (let location of this.database) {
        if (location) {
          // console.log('in loop, location:', location);
          for (let field of exceptionFields) {
            if (location.attributes[field]) {
              exceptionsPreliminary.push(location.attributes[field]);
            }
          }
        }
      }
      let exceptionsSet = new Set(exceptionsPreliminary);
      let exceptionsArray = [ ...exceptionsSet ];

      return exceptionsArray;
    },
    database() {
      if (this.$store.state.sources[this.$appType].data) {
        return this.$store.state.sources[this.$appType].data.rows || this.$store.state.sources[this.$appType].data.features || this.$store.state.sources[this.$appType].data;
      }
      return [];
    },
    allLowCostOptions() {
      let notes = [];
      for (let location of this.database) {
        if (location) {
          if (location.attributes.payment_other_low_cost) {
            notes.push(location.attributes.payment_other_low_cost);
          }
        }
      }
      return notes;
    },
    allFacebook() {
      let notes = [];
      for (let location of this.database) {
        if (location) {
          if (location.attributes.contact_facebook) {
            notes.push(location.attributes.contact_facebook);
          }
        }
      }
      return notes;
    },
    allInstagram() {
      let notes = [];
      for (let location of this.database) {
        if (location) {
          if (location.attributes.contact_instagram) {
            notes.push(location.attributes.contact_instagram);
          }
        }
      }
      return notes;
    },
    allTwitter() {
      let notes = [];
      for (let location of this.database) {
        if (location) {
          if (location.attributes.contact_twitter) {
            notes.push(location.attributes.contact_twitter);
          }
        }
      }
      return notes;
    },
    hasError() {
      return this.$store.state.geocode.status === 'error';
    },
    errorMessage() {
      const input = this.$store.state.geocode.input;
      return `
          <p>
            We couldn't find
            ${input ? '<strong>' + input + '</strong>' : 'that address'}.
            Are you sure everything was spelled correctly?
          </p>
          <p>
            Here are some examples of things you can search for:
          </p>
          <ul>
            <li>1234 Market St</li>
            <li>1001 Pine Street #201</li>
            <li>12th & Market</li>
            <li>883309050 (an OPA number with no hyphens or other characters)</li>
          </ul>
        `;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../node_modules/@phila/pinboard/src/assets/scss/customGreeting.scss";

li {
  margin-top: 0px !important;
}

.intro-list-item {
  line-height: 1.5rem;
}

</style>
