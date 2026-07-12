import { themes } from '../data/design-system'
import { useI18n } from '../i18n'

const arabicRules = [
  'استخدم خصائص CSS المنطقية بدلا من left وright.',
  'اختبر كل مكوّن مع dir="rtl" ونص مختلط بالعربية والإنجليزية.',
  'اعكس الأيقونات الاتجاهية فقط، وحافظ على الأيقونات المحايدة كما هي.',
  'استخدم أسماء start وend للمنافذ والمواضع في واجهة المكوّن.',
  'وفّر طباعة عربية محلية بمسافات أسطر مناسبة ولا تطبق uppercase.',
]

export function ArabicFriendlyPage() {
  const { locale } = useI18n()
  const isArabic = locale === 'ar'
  const rules = isArabic ? arabicRules : themes.arabicFriendly.rules

  return (
    <div className="page">
      <section className="page-hero compact">
        <p className="eyebrow">{isArabic ? 'دعم العربية' : 'Arabic Friendly'}</p>
        <h1>{isArabic ? 'دعم RTL والنصوص المختلطة متطلب أساسي للنظام.' : 'RTL and mixed-script support are system requirements.'}</h1>
        <p>
          {isArabic
            ? 'يهدف Ceramic إلى أن يكون نظاما مرجعيا جادا للفرق الناطقة بالعربية. لذلك تخضع المكونات والقوالب والثيمات والمستندات ومخرجات الذكاء الاصطناعي لفحوص صريحة ومتساوية.'
            : 'Ceramic should be usable as a serious reference system for Arabic-speaking teams. Components, templates, themes, docs, and AI output all need explicit, equal-quality checks.'}
        </p>
      </section>

      <section className="card-grid wide">
        <article className="card accent" id="arabic-preview" dir="rtl" lang="ar">
          <h3>واجهة عربية جاهزة</h3>
          <p>{isArabic ? 'يجب أن تعرض أسطح المعاينة تخطيط RTL ونصوصا مختلطة بالعربية والإنجليزية من دون كسر المحاذاة أو الاقتطاع.' : 'Preview surfaces must render right-to-left layout and mixed Arabic plus English labels without alignment or truncation failures.'}</p>
        </article>
        <article className="card" id="contract">
          <span className="kicker">{isArabic ? 'العقد' : 'Contract'}</span>
          <h3>{isArabic ? 'قواعد يجب أن يجتازها كل مكوّن' : 'Rules every component should pass'}</h3>
          <div className="rule-list">
            {rules.map((rule) => <span key={rule}>{rule}</span>)}
          </div>
        </article>
        <article className="card" id="typography">
          <span className="kicker">{isArabic ? 'الطباعة' : 'Typography'}</span>
          <h3>{isArabic ? 'مقياس عرض عربي مستقل ومتوازن' : 'Arabic display uses an equivalent, script-aware scale'}</h3>
          <p>{isArabic ? 'يستخدم ثيم The Utopia Studio Default خط IBM Plex Sans Arabic. يحافظ العرض العربي على إيقاع قريب من المقياس اللاتيني مع مسافة أسطر مقروءة، ولا يرث أبدا تنسيق الأحرف اللاتينية الكبيرة.' : 'The Utopia Studio Default theme uses IBM Plex Sans Arabic. Arabic display keeps an equivalent visual rhythm, readable line height, and never inherits Latin uppercase casing.'}</p>
          <code>{`--font-size-display: clamp(44px, 8vw, 96px)
--font-size-arabic-display: clamp(42px, 7.6vw, 91px)
--line-height-arabic-display: 1.16`}</code>
        </article>
        <article className="card" id="api-naming">
          <span className="kicker">{isArabic ? 'تسمية API' : 'API naming'}</span>
          <h3>{isArabic ? 'استخدم البداية والنهاية بدلا من اليسار واليمين' : 'Use start and end, not left and right'}</h3>
          <p>{isArabic ? 'تستخدم الخصائص والمنافذ أسماء منطقية كي تنعكس المكونات بشكل صحيح بين سياقي LTR وRTL.' : 'Props and slots use logical names so components mirror cleanly across LTR and RTL contexts.'}</p>
          <code>{`<Button startIcon={...} />
<AppShell sidebarPosition="start" />`}</code>
        </article>
        <article className="card" id="ai-rule">
          <span className="kicker">{isArabic ? 'قاعدة الذكاء الاصطناعي' : 'AI rule'}</span>
          <h3>{isArabic ? 'لا تخترع نصوصا عربية للإنتاج' : 'Do not invent production Arabic copy'}</h3>
          <p>{isArabic ? 'يمكن للوكلاء الاختبار بنصوص عربية موفرة أو عناصر نائبة أو ترجمات معتمدة. يجب ألا يختلقوا نصوصا تسويقية عربية نهائية.' : 'Agents may test with supplied Arabic strings, placeholders, or verified translations. They must not fabricate final Arabic marketing copy.'}</p>
        </article>
        <article className="card" id="ai-entrypoints">
          <span className="kicker">{isArabic ? 'مداخل الذكاء الاصطناعي' : 'AI entrypoints'}</span>
          <h3>{isArabic ? 'اقرأ العقد قبل إنشاء واجهة جاهزة للعربية' : 'Read the contract before generating Arabic-ready UI'}</h3>
          <p>{isArabic ? 'يجب على الوكلاء قراءة مستندات CLI الكثيفة وملف llms قبل كتابة سلوك التخطيط أو الطباعة أو الأيقونات أو الحركة أو الترجمة.' : 'Agents should read the dense CLI docs and llms entrypoint before writing layout, typography, icon, motion, or localization behavior.'}</p>
          <code>{`npm run ds -- docs arabic-friendly --dense
npm run ds -- docs foundations --dense
public/llms.txt`}</code>
        </article>
      </section>
    </div>
  )
}
