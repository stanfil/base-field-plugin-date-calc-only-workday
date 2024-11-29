import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType, DateFormatter } from '@lark-opdev/block-basekit-server-api';
import { calculateWorkdays } from './tools';

const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['raw.githubusercontent.com', 'gitee.com']);

basekit.addField({
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
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.DateTime],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'plusOrSubtract',
      label: t('plusOrSubtract'),
      component: FieldComponent.Radio,
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
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Number],
      },
      validator: {
        required: true,
      },
    }
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.DateTime,
    extra: {
      formatter: DateFormatter.DATE_YMD_WITH_HYPHEN,
    }
    // type: FieldType.Object,
    // extra: {
    //   icon: {
    //     light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
    //   },
    //   properties: [
    //     {
    //       key: 'id',
    //       isGroupByKey: true,
    //       type: FieldType.Text,
    //       title: 'id',
    //       hidden: true,
    //     },
    //     {
    //       key: 'result',
    //       type: FieldType.Text,
    //       title: t('result'),
    //       primary: true,
    //     }
    //   ],
    // },
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { date: number, count: number, plusOrSubtract: { value: boolean } }, context) => {
    let { date = null, count = 0, plusOrSubtract: { value = true } = {} } = formItemParams;
    try {
      // 取整
      count = count ? Math.round(count) : 0;

      const shouldCalc = !!date

      if (!shouldCalc) {
        return {
          code: FieldCode.Error,
        }
      }

      // console.log(111111 , date, count, value)

      const [result] = await calculateWorkdays(date, count, value, context.fetch);

      return {
        code: FieldCode.Success,
        data: result,
      }
    } catch (e) {
      return {
        code: FieldCode.Error,
      }
    }
  },
});
export default basekit;