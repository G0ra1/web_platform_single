export default {
    'And': {
        Node: {
            type: 'logic',
            text: 'and',
            code: 'and'
        },
        Fun: () => {

        }
    },
    'Or': {

        Node: {
            type: 'logic',
            text: 'or',
            code: 'or'
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
            text: '=',
            code: '='
        },
    },
    '(': {
        Node: {
            type: '(',
            text: '(',
            code: '('
        },
    },
    ')': {
        Node: {
            type: ')',
            text: ')',
            code: ')'
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
            type: 'string',
            text: '',
            code: ''
        },
    },
    '@appUserId': {
        Node: {
            type: '@appUserId',
            text: '登录人',
            code: '@appUserId'
        },
    },
    '@appUserDeptId': {
        Node: {
            type: '@appUserDeptId',
            text: '登录人部门',
            code: '@appUserDeptId'
        },
    },
    '@appUserOrgId': {
        Node: {
            type: '@appUserOrgId',
            text: '登录人机构',
            code: '@appUserOrgId'
        },
    },
    'Number': {
        Node: {
            type: 'number',
            text: '',
            code: ''
        },
    },
    'Array': {
        Node: {
            type: 'array',
            text: '[]',
            code: '[]'
        },
    },
    'Field': {
        Node: {
            type: 'field',
            text: '',
            code: ''
        },
    },
    'User': {
        Node: {
            type: 'user',
            text: '',
            code: ''
        },
    },
    'Org': {
        Node: {
            type: 'org',
            text: '',
            code: ''
        },
    },
    'Dict': {
        Node: {
            type: 'dict',
            text: '',
            code: ''
        },
    },
    'TreeDict': {
        Node: {
            type: 'treeDict',
            text: '',
            code: ''
        },
    }
}