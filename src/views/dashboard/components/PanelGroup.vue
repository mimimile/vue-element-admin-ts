<template>
  <el-row class="panel-group" :gutter="40">
    <el-col v-for="(item, key) in countData" :key="key" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData(item.name)">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon :icon-class="item.iconName" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{item.title}}</div>
          <count-to class="card-panel-num" :startVal="item.startVal" :endVal="item.endVal" :duration="item.duration"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import CountTo from 'vue-count-to'
import { Component, Vue, Emit } from 'vue-property-decorator'
import { CountData, LineChartName } from '../types'

@Component({
  components: {
    CountTo,
  },
})
export default class PanelGroup extends Vue {
  private countData: CountData[] = [
    {
      name: 'newVisitis',
      title: 'New Visits',
      iconName: 'peoples',
      startVal: 0,
      endVal: 102400,
      duration: 2600,
    },
    {
      name: 'messages',
      title: 'Messages',
      iconName: 'message',
      startVal: 0,
      endVal: 81212,
      duration: 3000,
    },
    {
      name: 'purchases',
      title: 'Purchases',
      iconName: 'money',
      startVal: 0,
      endVal: 9280,
      duration: 3200,
    },
    {
      name: 'shoppings',
      title: 'Shoppings',
      iconName: 'shoppingCard',
      startVal: 0,
      endVal: 13600,
      duration: 3600,
    },
  ]

  private type: string = ''

  @Emit('handleSetLineChartData')
  private handleSetLineChartData(type: string) {
    this.type = type
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
