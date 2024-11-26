<script setup>

import $config from '../main.js';

const props = defineProps({
  'message': {
    type: String,
    default: function() {
      return 'defaultMessage';
    },
  },
});

const sections = ref({});
// const subsections = ref({});

// computed
const allExceptions = computed(() => {
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
  for (let location of database.value) {
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
});

const database = computed(() => {
  return DataStore.sources[DataStore.appType].data.rows || DataStore.sources[DataStore.appType].features || DataStore.sources[DataStore.appType].data;
});

const allLowCostOptions = computed(() => {
  let notes = [];
  for (let location of database.value) {
    if (location) {
      if (location.attributes.payment_other_low_cost) {
        notes.push(location.attributes.payment_other_low_cost);
      }
    }
  }
  return notes;
});

const allFacebook = computed(() => {
  let notes = [];
  for (let location of database.value) {
    if (location) {
      if (location.attributes.contact_facebook) {
        notes.push(location.attributes.contact_facebook);
      }
    }
  }
  return notes;
});

const allInstagram = computed(() => {
  let notes = [];
  for (let location of database.value) {
    if (location) {
      if (location.attributes.contact_instagram) {
        notes.push(location.attributes.contact_instagram);
      }
    }
  }
  return notes;
});

const allTwitter = computed(() => {
  let notes = [];
  for (let location of database.value) {
    if (location) {
      if (location.attributes.contact_twitter) {
        notes.push(location.attributes.contact_twitter);
      }
    }
  }
  return notes;
});

</script>

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
      
      <p v-html="$t('introPage.p2')" />

      <ul>
        <li
          v-for="(item, index) in $config.i18n.data.messages['en-US'].introPage.ul1"
          :key="index"
          class="intro-list-item"
          v-html="$t('introPage.ul1.' + index)"
        />
      </ul>

      <div class="has-text-centered container mb-1 mt-5">
        <button
          class="button greeting-button"
          @click="$emit('view-list')"
          v-html="$t('app.viewList')"
        />
      </div>

      

      <!--

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
      </ul> -->
    </div> <!-- end of main-area -->
  </div>
</template>

<style scoped>

.main-greeting {
  padding: 1rem;
}

.greeting-button {
  background-color: #0f4d90 !important;
  border-color: #0f4d90 !important;
  font-size: 1rem;
  color: white;
  cursor: pointer;
}

.greeting-button:hover {
  border-color: #2176d2 !important;
}

.section-header {
    background-color: #0f4d90;
    font-size: 16px;
    color: white;
    padding: 4px;
    padding-left: 8px;
  }

.underlined {
  text-decoration: underline;
}

.no-margin {
  margin: 0px;
}

.big-cell-pad {
  font-size: 14px;
  padding: 4px;
  margin: 0px !important;
}

.small-cell-pad {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 4px;
  padding-left: 0px;
}

.custom-section {
  font-size: 14px;
  margin-left: 8px;
  margin-top: 4px;
  margin-top: 4px;
  margin-bottom: 12px;
}

.custom-ul {
  margin-left: 4rem;
  font-size: 14px;
}

.is-rtl {
  direction: rtl
}

li {
  margin-top: 0px !important;
}

.intro-list-item {
  line-height: 1.5rem;
}

</style>