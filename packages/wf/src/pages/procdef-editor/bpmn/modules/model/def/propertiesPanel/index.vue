<template>
    <div></div>
</template>
<script>
    import { get } from 'lodash'
    // import CustomModel from './CustomModel'
    import BpmnModdle from 'bpmn-js/lib/Modeler'; 
    export default {
        name: 'bpmn-UserTask',
        props: {
            modeler: {
              type: Object,
              default: () => ({})
            }
        },
        components: {
        
        },
        computed: {
            // ...mapState('process/business-warning_loss-electrictiy_hydro', [])
            loopCharacteristics () {
                let t = ''
                switch (get(this.element.businessObject, 'loopCharacteristics.$type', '')) {
                  case 'bpmn:MultiInstanceLoopCharacteristics':
                      if (get(this.element.businessObject, 'loopCharacteristics.isSequential', false)) {
                          t = 'charactSequential'
                      } else {
                          t = 'charactParallel'
                      }
                      break;
                  case 'bpmn:StandardLoopCharacteristics':
                      t = 'charactLoop'
                      break;
                  case '':
                      t = 'charactClear'
                      break;
                }
                return t
            }
        },
        data () {
            return {
                element: null,
                formTop: {},
            }
        },
        methods: {
            /**
             * 更新元素属性
             * @param { Object } 要更新的属性, 例如 { name: '' }
             */
            updateProperties(properties) {
                const { modeler, element } = this
                const modeling = modeler.get('modeling')
                modeling.updateProperties(element, properties)
                this.$forceUpdate();
            },
            setElement(element) {
                this.element = element
            },
            setLoopCharacteristics (d) {
                // CustomModel['create.user-task'][d](this.modeler, this.element)
                this.$forceUpdate();
            },
            setTest() {
              // CustomModel['create.user-task'].charactSequential(this.modeler, this.element)
            }
        },
        mounted () {
        },
    }
</script>
<style lang="less" scoped>
    .pro-properties-panel {
        padding: 5px;
        .header {
            height: 32px;
            font-size: 14px;
            font-weight: bold;
            i {
                font-size: 22px;
            }
        }
        :deep(.ivu-form) {
            .ivu-form-item {
              margin-bottom: 10px;
              .ivu-form-item-label {
                  font-size: 12px;
                  padding: 0 0 5px 0;
                  font-weight: bold;
              }
            }
        }
        .spin {
           background: #f8f8f8
        }
    }
</style>