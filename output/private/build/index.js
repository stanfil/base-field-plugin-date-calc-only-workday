"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const tools_1 = require("./tools");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['raw.githubusercontent.com', 'gitee.com']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            "zh-CN": {
                "date": "日期（包含当天）",
                "plusOrSubtract": "增加或减少",
                "count": "工作日天数(自动取整)",
                // "includeEndDay": "是否包含结束日期",
                // "dayoffList": "节假日清单",
                // "workdayList": "特殊工作日清单",
                "result": "计算结果日期(包含当天)",
                "plus": "加",
                "subtract": "减",
            },
            "en-US": {
                "date": "Date (inclusive)",
                "plusOrSubtract": "Add or Subtract",
                "count": "Number of Workdays (automatically rounded)",
                "result": "Calculated Result Date (inclusive)",
                "plus": "Add",
                "subtract": "Subtract"
            },
            "ja-JP": {
                "date": "日付（当日を含む）",
                "plusOrSubtract": "増加または減少",
                "count": "営業日数（自動丸め）",
                "result": "計算結果の日付（当日を含む）",
                "plus": "加算",
                "subtract": "減算"
            }
        }
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'date',
            label: t('date'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.DateTime],
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'plusOrSubtract',
            label: t('plusOrSubtract'),
            component: block_basekit_server_api_1.FieldComponent.Radio,
            props: {
                options: [
                    { label: t('plus'), value: true },
                    { label: t('subtract'), value: false },
                ]
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'count',
            label: t('count'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Number],
            },
            validator: {
                required: true,
            },
        }
    ],
    // 定义捷径的返回结果类型
    resultType: {
        // type: FieldType.DateTime,
        // extra: {
        //   formatter: DateFormatter.DATE_YMD_WITH_HYPHEN,
        // }
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/abjayvoz/ljhwZthlaukjlkulzlp/2024H2/gongzuoritianshu.png?x-resource-account=public',
            },
            properties: [
                {
                    key: 'id',
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: 'id',
                    hidden: true,
                },
                {
                    key: 'result',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result'),
                    primary: true,
                }
            ],
        },
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams, context) => {
        let { date = null, count = 0, plusOrSubtract: { value = true } = {} } = formItemParams;
        try {
            // 取整
            count = count ? Math.round(count) : 0;
            const shouldCalc = !!date;
            if (!shouldCalc) {
                return {
                    code: block_basekit_server_api_1.FieldCode.Error,
                };
            }
            // console.log(111111 , date, count, value)
            const [result] = await (0, tools_1.calculateWorkdays)(date, count, value, context.fetch);
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                // data: result,
                data: {
                    id: `${Math.random()}`,
                    result,
                }
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0o7QUFDL0osbUNBQTRDO0FBRTVDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxnQ0FBSyxDQUFDO0FBRXBCLDJCQUEyQjtBQUMzQixrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLDJCQUEyQixFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFFbEUsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixnQkFBZ0IsRUFBRSxPQUFPO2dCQUN6QixPQUFPLEVBQUUsYUFBYTtnQkFDdEIsK0JBQStCO2dCQUMvQix5QkFBeUI7Z0JBQ3pCLDRCQUE0QjtnQkFDNUIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLE1BQU0sRUFBRSxHQUFHO2dCQUNYLFVBQVUsRUFBRSxHQUFHO2FBQ2hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxrQkFBa0I7Z0JBQzFCLGdCQUFnQixFQUFFLGlCQUFpQjtnQkFDbkMsT0FBTyxFQUFFLDRDQUE0QztnQkFDckQsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsVUFBVSxFQUFFLFVBQVU7YUFDdkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFdBQVc7Z0JBQ25CLGdCQUFnQixFQUFFLFNBQVM7Z0JBQzNCLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixNQUFNLEVBQUUsSUFBSTtnQkFDWixVQUFVLEVBQUUsSUFBSTthQUNqQjtTQUNGO0tBQ0Y7SUFDRCxVQUFVO0lBQ1YsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxHQUFHLEVBQUUsTUFBTTtZQUNYLEtB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