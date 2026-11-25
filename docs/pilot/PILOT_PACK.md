# Pilot pack — three DLISs, four days

Everything you send and ask. Protocol from `docs/design/DIRECTORS_CUT_2.md`:
three DLISs (one senior, one promoted this year, one Arabic-first playing in
Arabic); at least one iPhone and one Android; inside Telegram, not a browser;
Worlds 1–3 then World 7; two sittings over four days; no coaching from us in
between. The readout afterwards is `docs/pilot/READOUT.md`.

## Before you send

- `003_feedback.sql` and `004_analytics_views.sql` applied, function
  redeployed, and `select * from v_toki_feedback` returns (empty is fine).
- World 7 for the pilot: either ask them to play through, or seed a save.
  Say which in the message; the one below asks them to play through.
- Open @TokiQuestBot on your own phone once; confirm the reveal shows the
  "Was this classroom fair?" card under the score.

## The message (Telegram DM, one per DLIS)

### English

> Hi [name],
>
> You are one of three coaches trying Toki's Coaching Quest before it goes to
> the whole team. It is a short game about reading classrooms and coaching
> the teacher in front of you. Nothing in it is scored against you and no
> one else sees your results.
>
> What we are asking:
>
> - Open @TokiQuestBot in Telegram on your phone (not in a browser).
> - About 15 minutes a day over the next four days. Two sittings is enough.
> - Play Worlds 1, 2 and 3, then World 7 (the Academy). Stop there.
> - After each classroom you will see "Was this classroom fair?" under your
>   score. When you disagree with the game's answer, tap Disagree and tell us
>   which answer, in one line. That note goes to the pedagogy team, not to
>   other coaches. It is the most useful thing you can do for us.
> - If the screen goes blank, freezes, or the Arabic reads wrong, send me a
>   screenshot here.
>
> After the four days I will ask for 15 minutes on a call. Thank you.

### العربية

> مرحبًا [الاسم]،
>
> أنت واحد من ثلاثة مدرّبين يجرّبون «مهمة توكي للتدريب» قبل أن تصل إلى
> الفريق كله. هي لعبة قصيرة عن قراءة الصفوف وتدريب المعلّم الذي أمامك. لا
> شيء فيها يُحتسب عليك، ولا يرى أحد غيرك نتائجك.
>
> ما نطلبه:
>
> - افتح @TokiQuestBot في تيليجرام على هاتفك (لا في المتصفح)، واختر العربية.
> - نحو ١٥ دقيقة في اليوم خلال الأيام الأربعة القادمة. جلستان تكفيان.
> - العب العوالم ١ و٢ و٣، ثم العالم ٧ (الأكاديمية). توقّف عندها.
> - بعد كل صف سترى «هل كان هذا الصف منصفًا؟» تحت نتيجتك. حين لا توافق على
>   إجابة اللعبة، اضغط «لا أوافق» وأخبرنا أي إجابة، في سطر واحد. تصل
>   ملاحظتك إلى فريق التعليم، لا إلى المدرّبين الآخرين. هذا أكثر ما يفيدنا.
> - إن فرغت الشاشة أو تجمّدت، أو بدت العربية غير سليمة، أرسل لي لقطة شاشة
>   هنا.
>
> بعد الأيام الأربعة سأطلب منك ١٥ دقيقة على مكالمة. شكرًا لك.

## Instructions, in short (for the call that sends it, or a pinned note)

1. Telegram on the phone, @TokiQuestBot. Not a browser tab.
2. 15 minutes a day, four days, two sittings minimum.
3. Worlds 1 → 2 → 3, then 7. Nothing else.
4. Tap the feedback card when you disagree; one line on which answer.
5. Screenshot anything that looks broken and send it in the chat.
6. We do not help in between; that is the point.

## The interview (15 minutes each, after day four)

Have `docs/pilot/READOUT.md` query 4 open filtered to the player, so you can
ask about the rooms they flagged by name.

1. Name one teacher from the game. (If they can't, the conversations aren't landing.)
2. Which classroom did you disagree with the "correct" answer on, and why? (This is the question that finds content bugs the panel missed.)
3. Did any teacher sound fake? Which line?
4. Arabic player only: did the teachers sound like teachers you know, or like a book?
5. Was there a moment you felt the game was unfair? A moment it was too easy?
6. Did you turn read-aloud on? Did it help or annoy?
7. Would you play World 4 if we sent the link?

Write the answers under the player's row from `v_toki_sessions`; question 1
for the Arabic player and question 5 for everyone feed the go / no-go
directly.

## What you are checking for (go / no-go)

- All three finish World 1; at least two finish World 3 (`v_toki_funnel`).
- No classroom under 25% first-try (`v_toki_pilot_readout`).
- Nobody reports a blank screen or a frozen Observe on iPhone (the chat).
- The Arabic player names a teacher (question 1).

Any one failing is a fix-and-re-pilot, not a launch.
