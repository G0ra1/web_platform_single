export default {
    'And': {
        Node: {
            type: 'logic',
            text: 'and',
            code: '&&'
        },
        Fun: () => {

        }
    },
    'Or': {

        Node: {
            type: 'logic',
            text: 'or',
            code: '||'
        },
    },
    'In': {

        Node: {
            type: 'logic',
            text: 'in',
            code: 'in'
        },
    },
    'Not in': {

        Node: {
            type: 'logic',
            text: 'not in',
            code: 'not in'
        },
    },
    '!': {
        Node: {
            type: 'logic',
            text: '!',
            code: '!'
        },
    },
    '!=': {
        Node: {
            type: 'logic',
            text: '!=',
            code: '!='
        },
    },
    '<': {
        Node: {
            type: 'logic',
            text: '<',
            code: '<'
        },
    },
    '<=': {
        Node: {
            type: 'logic',
            text: '<=',
            code: '<='
        },
    },
    '>': {

        Node: {
            type: 'logic',
            text: '>',
            code: '>'
        },
    },
    '>=': {
        Node: {
            type: 'logic',
            text: '>=',
            code: '>='
        },
    },
    '=': {
        Node: {
            type: 'logic',
            text: '==',
            code: '=='
        },
    },
    '( )': {
        Node: {
            type: 'group',
            children: []
        },
    },
    '+': {
        Node: {
            type: 'operation',
            text: '+',
            code: '+'
        },
    },
    '-': {
        Node: {
            type: 'operation',
            text: '-',
            code: '-'
        },

    },
    'x': {
        Node: {
            type: 'operation',
            text: '×',
            code: '*'
        },
    },
    '/': {

        Node: {
            type: 'operation',
            text: '÷',
            code: '/'
        },
    },
    'String': {
        Node: {
            type: 'String',
            text: '',
            code: ''
        },
    },
    'Number': {
        Node: {
            type: 'Number',
            text: '',
            code: ''
        },
    },
    'Array': {
        Node: {
            type: 'Array',
            text: '[]',
            code: '[]'
        },
    }
}