# Arabic content review — Toki's Coaching Quest

**Reviewer role:** senior Arabic-speaking DLIS (UAE Alef school), reading every Arabic string as a native reader.
**Scope:** the Arabic half of every `t(en, ar)` in `src/data/levels/*.ts`, `src/data/badges.ts`, `src/data/worlds.ts`, `src/data/skins.ts`, `src/i18n/ui.ts`, and the inline strings in `src/screens/*.tsx` / `src/components/*.tsx` — **2,137 bilingual strings**, all read.
**Result:** 183 Arabic strings changed (186 individual edits). No English text, ids, structure, or option order was touched (verified by re-extracting all strings and diffing the English side: identical).

Overall verdict before the pass: the Arabic was already sound, grammatical MSA with correct Arabic punctuation (`،` `؛` `؟`), consistent Arabic-Indic numerals and `٪`, and no leaked English. What it needed was (a) one real sense error, (b) a handful of gender-agreement slips, (c) terminology drift on four key terms, and (d) teacher dialogue that read as translated English rather than as a UAE teacher talking after a lesson.

---

## 1. Glossary (now applied consistently)

| English | Arabic | Notes |
|---|---|---|
| drift | **الانحراف** | "ما الذي ينحرف هنا؟" — never "انجراف/انزلاق". |
| lethal mutation | **التحوّر القاتل** | Keep the biology metaphor; "تحوّر" not "طفرة". |
| coaching move | **الخطوة التدريبية** / خطوة تدريبية | Not "خطوة التدريب". |
| coach / DLIS | **المدرّب** | Official Alef title when spelled out: **أخصائي تطبيق التعلّم الرقمي (DLIS)**. Never "المشرف" (that is a supervisor/line manager — a different relationship). "Master DLIS" stays **خبير DLIS**. |
| engagement | **التفاعل** | Was mostly "المشاركة", which collides with *participation* below. World 1's theme is precisely that the two are not the same. |
| participation | **المشاركة** | "المشاركة ≠ التعلّم" (Level 1 title). |
| exit ticket | **بطاقة الخروج** | |
| success criteria | **معايير النجاح** | |
| cold call / no hands | **النداء بالاسم** (دون رفع أيدٍ) | Not "نداء عشوائي" — the point is that the teacher chooses, not that it is random. |
| wait time | **وقت الانتظار** | |
| differentiation | **التمايز** | "متمايز" for *differentiated*. |
| scheme of work | **الخطة الدراسية** | Was also "خطة المنهج" in World 4. |
| rubric | **سلّم التقدير** | Was "معيار التقييم / المعيار", which reads as *criterion*. (The Lethal Mutation Academy keeps "معيار" only where English says *criterion*.) |
| baseline (test) | **التقييم الأساسي** | Was also "الاختبار القاعدي". |
| checkpoint (assessment) | **التقويم** | *assessment* in general = **التقييم**. "عيّنة تقييم" for *Assessment sample*. |
| mini whiteboards | **السبورات الصغيرة** | |
| closure / plenary | **الخاتمة** | |
| Alef (the platform) | **«ألف»** in guillemets | Prevents misreading as the letter/number "ألف" (one thousand). Inside quoted student speech the inner guillemets are dropped to avoid nesting: «ادخل على ألف.» |
| live view | **العرض المباشر** | |
| completion | **الإنجاز** (dashboard) / **إكمال** (lesson completion %) | Both already in use; left as is. |
| feedback | **التغذية الراجعة** | |
| inspector | **المفتّش** | Kept — the W7 line "التناسب هو ما يفصل المدرّب عن المفتّش" needs the contrast. |

Ability-group bird names (World 6): النسور (Eagles) · الصقور (Hawks) · **الحساسين** (Robins) · **العصافير** (Sparrows). Previously "العصافير/الدوري" were swapped between the level and its hints; now "Sparrow" = عصفور/عصفورة everywhere.

**Conventions:** Arabic-Indic digits (٠–٩) and `٪` everywhere; decimal separator `٫` (٠٫٨ ثانية); clock times as digits (٢:٤٠، ٧:٢٠ صباحًا) not spelled out; guillemets « » for quotation; em-dash — kept as in English. Diacritics only where a reading would otherwise be ambiguous (تُشارَك، مُتعلَّم، يُحسّن) — never full tashkeel.

---

## 2. Top 20 before → after (with why)

| # | File | Before | After | Why |
|---|---|---|---|---|
| 1 | world2.ts (Mr. Tariq, closes) | الخطة الدراسية جاءت من قسمكم. **راجعوا أنفسكم.** | الخطة الدراسية جاءت من **عندكم. تكلّموا مع بعضكم.** | Sense error. "Take it up with them" was rendered as "review yourselves". |
| 2 | ui.ts stance chips | مُرهَق / فخور / متحمّس / في موقف دفاعي | نبرة إرهاق / نبرة فخر / نبرة حماس / نبرة دفاعية | The chip is rendered next to the teacher's name ("الأستاذة هدى، مُرهَق") — masculine adjective after a female name. Nominal "نبرة …" is gender-neutral. |
| 3 | world5.ts "Guess What I'm Thinking" (7 lines) | يطرح المعلّم … وجه المعلّم … يتوقعها المعلّم | تطرح المعلّمة … وجه المعلّمة … تتوقعها المعلّمة | The level's teacher is Ms. Salma and the English reveal says "the word *she* wanted"; the Arabic switched gender mid-level. |
| 4 | world4.ts Written Comments options | **أعيدي** التعليقات… / **استبدلي** التعليقات… | **أعد** التعليقات… / **استبدل** التعليقات… | Two of four option labels were feminine imperatives (addressed to the teacher) while the other two addressed the coach — a register mismatch that also marks those two as "different". |
| 5 | world6.ts Help for Some, correct option | …مسألة مفتوحة بخطوة «أثبت ذلك»**، تُفحص في الدقائق العشر الأخيرة** | …مسألة مفتوحة بخطوة «أثبت ذلك» | The Arabic option carried an extra clause not in English, making the correct answer the longest and pre-empting the reasoning step. |
| 6 | all files (≈30 lines) | المشاركة for *engagement* | **التفاعل** | Glossary. World 1 is literally "When Engagement Replaces Learning" — using the same word for *participation* and *engagement* erased the distinction the game teaches. |
| 7 | world8.ts closing | بصفتك **مشرفًا**، دورك… | بصفتك **أخصائي تطبيق التعلّم الرقمي (DLIS)**، دورك… | "مشرف" is a supervisor. This is the one line that names the player's job; it should be the real title. |
| 8 | world3.ts Ms. Shamma | أعرف أن بعض **المشرفين** يريدونني… | أعرف أن بعض **المدرّبين** يريدونني… | Same: she means coaches, not supervisors. |
| 9 | world2.ts / world3.ts | الجمعة، الثانية وأربعون دقيقة. / السابعة وعشرون دقيقة صباحًا | الجمعة، ٢:٤٠ بعد الظهر. / ٧:٢٠ صباحًا | Spelled-out clock times read like a dictation exercise; nobody says "الثانية وأربعون دقيقة". |
| 10 | world4.ts Ms. Reem | يستهلك **سبتي** كله / **سبتك** يعود إليك | يأخذ **يوم السبت** كله مني / **يرجع لك يوم السبت** | "سبتي" is a calque of "my Saturday"; Arabic doesn't possessivise weekdays. |
| 11 | conversations1.ts and world2–6 (≈20 lines) | **إذًا** ماذا، … / **إذًا** أقضي… | **يعني** ماذا، … / **يعني** أقضي… | Sentence-initial "So…?" from a tired or defensive teacher is "يعني…" in every Gulf staffroom; "إذًا" belongs in a proof. Applied only to teacher dialogue, never to Toki's reasoning text or UI. |
| 12 | teacher dialogue (≈15 lines) | حسنًا. | طيّب. | Same register point: "طيّب" is how a teacher concedes a point out loud; "حسنًا" is how a textbook does. Left "حسنًا" in UI buttons and in Toki's narration. |
| 13 | conversations7.ts Ms. Noura | **عدّ.** سأحاول. **أفقد الحساب** حين يشتدّ الدرس | **أعدّ.** سأحاول. **أضيع العدّ** حين يحمى الدرس | "عدّ" alone is an imperative; "أفقد الحساب" is accounting, not counting. |
| 14 | conversations7.ts | سأـ… أدوّن ذلك مع **الثلاثة** الأخرى | سأ… أدوّن ذلك مع **الثلاث** الأخرى | Gender agreement (ملاحظات is feminine) and a stray tatweel. |
| 15 | level3.ts clue title | اسأل **صاحب** العمل | اسأل **صاحبة** العمل | The artist is "she" two lines later. |
| 16 | level1.ts, level2.ts options | **ازدوج** المحطات… / "مشاركة الطلاب" | **رتّب المحطات في أزواج**… / "تفاعل الطلاب" | "ازدوج" is not a usable imperative; and the drift option needed the glossary term. |
| 17 | world3.ts (×9), boss.ts, world3boss.ts, worlds.ts | درس ألف / بيانات ألف / ألف في الميدان | درس «ألف» / بيانات «ألف» / «ألف» في الميدان | Bare "ألف" is read as "a thousand" at a glance ("أكمل كل طالب درس ألف" = "every student finished a thousand lessons"). |
| 18 | world2.ts Marks Without Feedback | صف **المعيار** / بدل **معيار** كامل | صف **سلّم التقدير** / بدل **سلّم تقدير** كامل | *rubric row* ≠ *criterion row*; the reasoning option "A rubric row names the criterion but not the move" was unreadable with both words rendered as معيار. |
| 19 | world8.ts leadership reveal | كل انحراف صفّي… **يقع في مجرى** هذه الغرفة / **في أعلى مجرى** الجميع | **ينبع من** هذه الغرفة / **عند منبع** كل ذلك | "downstream/upstream" calqued literally is meaningless in Arabic; "ينبع من / منبع" carries the image. |
| 20 | world5.ts No Wait Time clue | سؤال، **٠.٨** ثانية | سؤال، **٠٫٨** ثانية | Arabic decimal separator; the other two occurrences in the same world already used it. |

Other smaller fixes in the same spirit: "لمن أستمع" → "لمن أصغي"; "عدنا في دائرة" → "درنا دورة كاملة"; "قل لي إن هذا ليس مشاركة" → "…ليس تفاعلًا"; "أكثر حذرًا" / "أكثر حرصًا" unified to "أكثر حرصًا" (the student's quote is reused in three places); "وسبر أغواره" → "وسبرها"; "ما وراء السطح المشغول المبهر" → "ما وراء المشهد المزدحم المبهر"; "يُقال لمعلّم قوي" → "قُلته لمعلّم قوي" (the badge is about what *you* said); "عندما تكون مستعدًا" → "عند استعدادك" (neutral address to the player).

---

## 3. Unsure — needs a second native reviewer (11 items)

1. **Player address gender.** The UI addresses the player in the generic masculine (ابدأ، اختر، أكمل، شاراتك). Most DLIS are women. I neutralised the one sentence that was explicitly gendered ("عندما تكون مستعدًا") but did not rewrite every imperative. Decision needed: keep generic masculine (standard for UAE government UI) or move to nominal forms (البداية، الاختيار…) throughout.
2. **"The teacher has stopped listening."** → توقّف المعلّم عن الإصغاء. Generic masculine after a conversation with a female teacher. Alternative: "انتهى الإصغاء من الطرف الآخر."
3. **"Wrapped Up Toki"** → توكي بالعمامة. I don't know what the skin art actually shows (scarf? turban? hoodie?). Check against the sprite.
4. **"MVP Toki"** → توكي النجم. Fine, but "MVP" has no Arabic equivalent; confirm it isn't meant to stay Latin like "DLIS".
5. **بطاقة الخروج** vs. **تذكرة الخروج** — Alef PD materials may use one or the other; I kept بطاقة (already consistent in-game).
6. **سلّم التقدير** for *rubric* — ADEK/MoE documents also use "مصفوفة التقييم" and some schools say "روبرك". Pick whichever the DLIS cohort hears in Alef training.
7. **الإنجاز / الإكمال** for *completion* — both are used (Dashboard = الإنجاز, "96% completion" = إكمال ٩٦٪). Readable, but a single term would be cleaner.
8. **World 5 "No Wait Time"**: the English level text says "a habit the teacher counts on *her* fingers" while the paired conversation teacher is **Mr. Rashed**. The Arabic follows the English (feminine). This is an English-side inconsistency to flag to the EN reviewer — fix there first, then mirror.
9. **World 7 "The Showcase Lesson"** — "ملاحظة مُعلنة" for *An announced observation*. In UAE schools people say "زيارة صفّية معلنة" more often than "ملاحظة". Same for "نموذج الملاحظة" (observation form). I left "ملاحظة" because the game uses it everywhere; a global swap to "الزيارة الصفّية" is defensible.
10. **"Head" / "the head"** → المدير. In Alef schools the person a teacher threatens to "tell" is more often the **principal** (مدير المدرسة) or HoD (رئيس القسم). Readable as is.
11. **Emirati flavour vs. MSA.** I moved teacher dialogue toward spoken Gulf register only through lexical choices that are still standard Arabic (يعني، طيّب، صراحةً، تعال، يرجع لك). I did **not** introduce dialect spellings (شو، وين، هاي، ما عندي). Decision for the team: that is the right ceiling for a professional-development product read by Arabic teachers; going further would need a native Emirati writer, not a reviewer.

---

## 4. Register note for future authors

- **Three voices, three registers.** Toki (the coach) speaks clean, warm MSA with short sentences and questions — he is modelling coaching language, so keep him precise. Teachers speak like teachers after a lesson: "يعني…", "طيّب.", "صراحةً", "تعال وشوف" is too far — "تعال وشاهد" is the ceiling. UI text is neutral MSA, imperative, no exclamation marks except "أحسنت!" / "عاد الصف إلى مساره!".
- **Never translate the English idiom; translate the move.** "My Saturday back", "take it up with them", "we've gone in a circle", "downstream of this room" all needed Arabic images, not Arabic words.
- **Option labels must stay the same length and register as each other.** Don't add a reason to the correct option, and don't change who the imperative addresses (always the coach: أعد، احتفظ، دع، اقترح).
- **Hints are questions that point at a clue, not explanations.** Keep "انظر إلى «…»" / "افتح «…»" with the clue title in guillemets exactly as it appears on screen.
- **Gender:** fix the teacher's gender per level from `teacherName` in the conversation data and keep it consistent across intro, clues, hints, reasoning, and reveal. Student clues follow the English pronoun.
- **Numbers:** Arabic-Indic digits always, `٪` attached, `٫` for decimals, clock times as digits.
- **"ألف" is a word before it is a brand.** Always «ألف» outside quoted speech.
- **Run `scratchpad/ar/extract.py` + `audit.py`** (or re-create them from this doc's conventions) before merging content: they catch Latin punctuation, mixed digits, bare ألف, and glossary drift mechanically.
