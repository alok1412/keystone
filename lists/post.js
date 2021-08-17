const { Text, CalendarDay, Checkbox , Select , DateTime } = require('@keystonejs/fields');
const { Content } = require('@keystonejs/fields-content');

module.exports = {
    fields:{
        name: { 
            type: Text, 
            required: true 
        },
        state: { 
            type: Select, 
            options: 'draft, published, archived', 
            default: 'draft' 
        },
        author: { 
            type: Text, 
            ref: 'User' 
        },
        createdAt: { 
            type: CalendarDay,
            dateFrom: '2019-01-01',
            dateTo: '2029-01-01',
            isRequired: false,
            defaultValue: new Date().toISOString('YYYY-MM-DD').substring(0, 10), // Today's date
        },
        ingredientList: { 
            type: Text, 
            wysiwyg: true, 
            height: 150 
        },
        Instruction: {
            type: Content,
            wysiwyg: true,
            height: 500
        },
    },
}
