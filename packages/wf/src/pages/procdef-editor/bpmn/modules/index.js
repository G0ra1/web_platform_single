// import PropertiesProvider from './PropertiesProvider'
import ContextPad from './context-pad/index'
import Palette from './palette/index'
import minimapModule from 'diagram-js-minimap';
// console.log('===minimapModule=====', minimapModule)

export default (isDisabled = false) => {

    return [
        minimapModule,
        // PropertiesProvider,
        ...(isDisabled ? [{
            paletteProvider: ["value", ''],
            contextPadProvider: ["value", ''],
            bendpoints: ["value", {}]
        }] : [
            ContextPad,
            Palette,
        ])
    ]
}