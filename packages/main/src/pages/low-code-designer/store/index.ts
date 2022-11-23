import { Designer } from '../model/designer'
import type { DesignerInstance } from '../model/designer.d'

import DemoData from "../widget-source/demo-tabs"
// 
export const designer: DesignerInstance = new Designer(DemoData)