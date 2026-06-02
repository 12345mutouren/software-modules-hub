# Incident Response Runbook

事故响应目标：快速止损、恢复服务、保留证据、复盘改进。

## Severity Levels

| Level | Meaning | Examples |
| --- | --- | --- |
| SEV-1 | 严重生产事故 | 服务不可用、支付失败、数据泄露 |
| SEV-2 | 重要功能受损 | 登录异常、订单部分失败、后台任务堆积 |
| SEV-3 | 局部问题 | 单个页面错误、少量用户受影响 |
| SEV-4 | 低风险问题 | 文案、非关键 UI、轻微性能波动 |

## Response Steps

1. 确认事故。
2. 指定负责人。
3. 建立沟通频道。
4. 判断影响范围。
5. 采取止损动作。
6. 恢复服务。
7. 通知受影响用户或内部团队。
8. 写复盘报告。

## First 15 Minutes

- [ ] 确认报警来源。
- [ ] 确认是否真实影响用户。
- [ ] 查看最近发布。
- [ ] 查看错误率和日志。
- [ ] 判断是否需要回滚。
- [ ] 指定唯一负责人。

## Evidence To Collect

- 时间线。
- 受影响接口和页面。
- 错误日志。
- 发布记录。
- 数据库或队列状态。
- 第三方服务状态。
- 用户反馈和客服记录。

## Postmortem Template

```text
Title:
Severity:
Start time:
End time:
Impact:
Root cause:
Detection:
Resolution:
What went well:
What went poorly:
Action items:
Owner:
Due date:
```

