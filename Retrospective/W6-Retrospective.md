# TEMPLATE FOR RETROSPECTIVE (Team 10)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed: 2
- Number of stories done: 2
- Total points committed: 8 (3 + 5)
- Total points done: 8
- Nr. of hours planned: 60h00
- Nr. of hours spent (as a team): 43h15

Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on Git on dev branch
- End-to-End tests performed
- Code is potentially sellable
- Related documentation is recorded (e.g. README)

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 6       | N/A    | 31h30      | 32h30        |
| _#1_  | 5       | 3      | 7h30       | 5            |
| _#4_  | 6       | 5      | 9          | 6h45         |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

|            | Mean   | StDev  |
| ---------- | ------ | ------ |
| Estimation | 2,83 h | 1,85 h |
| Actual     | 2,60 h | 2,14 h |

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

  $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1 = \frac{44,25}{48} - 1= -0,078$$

- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

  $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| = 0.198 $$

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 1h
  - Total hours spent: 2h
  - Nr of automated unit test cases: 27
  - Coverage: 39.64%
- E2E testing:
  - Total hours estimated: 30m
  - Total hours spent: 30m
  - Nr of test cases: 6
- Code review
  - Total hours estimated: 1h
  - Total hours spent: 1h30m

## ASSESSMENT

- What caused your errors in estimation (if any)?

  Our initial estimates were less accurate because the team was still calibrating its workflow. As a first approach, we were actively figuring out task allocation and team synchronization.

- What lessons did you learn (both positive and negative) in this sprint?

  - On the positive side, this sprint highlighted the importance of strong team collaboration and mutual support—stepping up when team members had conflicting commitments made a big difference. We also strengthened our technical workflow by setting up the repository, configuring Docker containers, and tracking tasks effectively with YouTrack.

  - On the challenging side, balancing varying university and work schedules made real-time coordination difficult, showing us that we need to rely more on structured asynchronous communication moving forward.

- Which improvement goals set in the previous retrospective were you able to achieve?

  This is our first retrospective, so not so much on the that item. Yet, we wanted to have a more streamlined workflow and collaboration methods, and we were able to achieve so by a better collaboration using Youtrack (e.g. tickets definition and time registration) and other tools like telegram and GitHub.

- Which ones you were not able to achieve? Why?

  The implementation of Youtrack in terms of time tracking and functionalies related to sprint and task management could have been better. e.g. record the Nr of hours spent on reviews in the Youtrack ticket before closing.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  A possible improvement could be to optimize better the work management in the planning phase in order to achieve a better planification of the work. We also need to track better the timinig on YouTrack.

- One thing you are proud of as a Team!!

  One thing we are truly proud of is how quickly we established a positive, supportive team culture. Right from the start, every member showed a genuine willingness to collaborate, communicate openly, and contribute to our shared goals.
