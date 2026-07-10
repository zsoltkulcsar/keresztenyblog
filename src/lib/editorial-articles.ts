export type ArticleFormat = 'devotion' | 'reflection' | 'teaching' | 'testimony'

export type EditorialSeriesMembership = {
  description: string
  label: string
  order: number
  slug: string
}

export type EditorialArticleSeed = {
  audience: string[]
  author: string
  body: Array<{
    body: string[]
    heading: string
  }>
  category: string
  excerpt: string
  format: ArticleFormat
  mainScripture: string
  publishedAt: string
  pullQuote: string
  readingMinutes: number
  relatedBook?: string
  relatedResource?: string
  series: EditorialSeriesMembership[]
  slug: string
  studyQuestions: string[]
  subtitle: string
  tags: string[]
  title: string
  topic: string[]
  scriptureText: string
}

export const editorialArticles: EditorialArticleSeed[] = [
  {
    audience: ['New Believers'],
    author: 'Editorial Team',
    body: [
      {
        heading: 'You Were Made Alive',
        body: [
          'Paul starts with a blunt diagnosis: before Christ, you were dead in trespasses and sins. A dead person does not need better advice. A dead person needs life.',
          'Regeneration means God gave spiritual life where there was none. Your faith was real, but even your ability to believe was a gift of grace.',
          'This matters because many new believers immediately start worrying. Did I believe the right way? Was I sincere enough? Did I say the right prayer? What if I did it wrong?',
          'If your salvation depended on the quality of your decision, those fears would be justified. But your salvation depends on the power of God’s action. He made you alive. A baby does not deliver itself. A dead man does not resuscitate himself. God acted, and you responded, and even the response was His gift.',
          'This is the foundation of every assurance you will ever need. Your security is not in the strength of your faith. It is in the faithfulness of the God who raised you.',
        ],
      },
      {
        heading: 'You Were Declared Righteous',
        body: [
          'Justification is God’s legal declaration that you are righteous in Christ. It is not the same as becoming morally perfect overnight.',
          'Your condition may fluctuate as you grow, stumble, and repent, but your position in Christ rests on God’s verdict, not your performance.',
          'This concept often feels too good to be true, especially if you come from a background where acceptance was always earned. In most of life, standing is based on performance. Your employer evaluates you. Your relationships shift based on behavior. Even your own self-assessment rises and falls with your track record.',
          'But justification works in the opposite direction. God does not accept you because you have become acceptable. He declares you acceptable because of Christ, and then He begins to actually make you more like Christ over time. That second process, being actually transformed, is called sanctification. It is real and important, but it is not the basis of your acceptance.',
          'When you sin tomorrow, the enemy will whisper that you are a fraud, that your faith was not real, that God has withdrawn His approval. In that moment, you need to know the difference between your position and your condition. Your condition fluctuates. Your position, justified in Christ, does not.',
        ],
      },
      {
        heading: 'You Were Brought Into the Family',
        body: [
          'Adoption means you are not only pardoned; you are wanted. God gives you a new Father, a new household, and an inheritance kept in heaven.',
          'Christian obedience starts from this identity. A child obeys because he already belongs, not in order to become a child.',
          'Regeneration tells you that you are alive. Justification tells you that you are accepted. Adoption tells you that you are wanted. You are not a pardoned criminal kept at arm’s length. You are a child brought into the household, given the family name, and seated at the table.',
          'Paul writes in Galatians that because we are sons, God has sent the Spirit of His Son into our hearts, crying, “Abba! Father!” That instinct to cry out to God as Father, even when you are ashamed, is not emotional weakness. It is evidence of the Spirit’s work in you.',
          'When loneliness hits, when shame returns, when you wonder whether you really belong, remember that adoption is not something you applied for. It is something God chose. You were wanted before you knew you were lost.',
        ],
      },
      {
        heading: 'All of Grace, None of You',
        body: [
          'Paul’s summary in Ephesians 2 pulls all of this together: “For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.” Three things God did: made you alive, declared you righteous, adopted you as His child. In none of them were you the primary actor.',
          'This is hard to accept because we are wired to contribute. We want to earn our place. We want to bring something to the table. And in sanctification, in the daily process of growing, there is real human effort involved. You do read the Bible. You do pray. You do fight sin. You do serve. But even that effort is empowered by grace.',
          'In salvation itself, in the moment you passed from death to life, from guilty to justified, from orphan to child, you contributed nothing but the sin that made it necessary. This is why the gospel offends the proud and comforts the broken. You cannot boast because you did not achieve. You can only worship because you were given what you could never earn.',
        ],
      },
      {
        heading: 'So What Now?',
        body: [
          'Paul does not end at verse 9. Verse 10 is the hinge: “For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them.”',
          'You were not saved by works. But you were saved for works. There is a life God has prepared for you: acts of love, service, obedience, courage, generosity, and faithfulness. You are not earning your place by doing them. You are walking into the life that your new identity makes possible.',
          'A child does not obey a good father in order to become a son. He obeys because he already is one. That is the rhythm of the Christian life. Identity first, then obedience. Grace first, then gratitude. What God has done first, then what you do in response.',
          'You were dead, and He made you alive. You were guilty, and He declared you righteous. You were alone, and He made you His child. That is what happened when you believed.',
        ],
      },
    ],
    category: 'Doctrine / Salvation',
    excerpt:
      'When you put your faith in Christ, something far deeper than a decision took place. God made you alive, declared you righteous, and brought you into His family.',
    format: 'teaching',
    mainScripture: 'Ephesians 2:1-10',
    publishedAt: '2026-07-01',
    pullQuote:
      'You did not just make a decision. You were made alive. That is a difference that changes everything.',
    readingMinutes: 14,
    relatedBook: 'Knowing God by J.I. Packer',
    relatedResource: 'How to Read the Bible for the First Time',
    scriptureText:
      'But God, being rich in mercy, because of the great love with which he loved us, even when we were dead in our trespasses, made us alive together with Christ — by grace you have been saved.',
    series: [
      {
        description:
          'A first path for readers who are learning the basic shape of Christian faith.',
        label: 'Foundations for New Believers',
        order: 1,
        slug: 'foundations-for-new-believers',
      },
    ],
    slug: 'what-happened-when-you-believed',
    studyQuestions: [
      'How would you have described conversion before reading this?',
      'Why does it matter that Paul says we were dead, not merely sick?',
      'What is the difference between justification and sanctification?',
      'How does adoption change the way you approach God in prayer?',
      'Which reality do you most need to remember when assurance feels weak?',
    ],
    subtitle: 'Understanding what God actually did when He saved you',
    tags: ['salvation', 'regeneration', 'justification', 'adoption', 'grace'],
    title: 'What Happened When You Believed',
    topic: ['Salvation', 'Grace', 'Identity in Christ'],
  },
  {
    audience: ['New Believers'],
    author: 'Editorial Team',
    body: [
      {
        heading: 'What the Bible Is',
        body: [
          'The Bible is not a self-help book or a collection of inspirational quotes. It is the story of God: creation, rebellion, redemption, and restoration.',
          'It is also the primary way God speaks reliably to His people. Psalm 119 calls it a lamp, not a floodlight: enough light for the next step.',
        ],
      },
      {
        heading: 'Where to Start',
        body: [
          'Start with Mark, then John. Mark moves quickly and shows what Jesus did; John slows down and shows what it means.',
          'After the Gospels, continue through the New Testament before returning to the Old Testament with Christ at the center of the story.',
        ],
      },
      {
        heading: 'How to Read',
        body: [
          'Read the passage once for the flow, then read again slowly. Ask what it says about God, people, and your response.',
          'End with prayer, even if it is only one honest sentence. Prayer turns reading into communion with God.',
        ],
      },
    ],
    category: 'Spiritual Disciplines / Bible Reading',
    excerpt:
      'The Bible is not a book you master. It is a book that masters you, but you have to actually open it.',
    format: 'teaching',
    mainScripture: 'Psalm 119:105-112',
    publishedAt: '2026-07-02',
    pullQuote:
      'You do not need to understand everything. You need to show up, read, and let God speak at His pace, not yours.',
    readingMinutes: 13,
    relatedBook: 'Women of the Word by Jen Wilkin',
    relatedResource: 'First-Month Bible Reading Plan',
    scriptureText: 'Your word is a lamp to my feet and a light to my path.',
    series: [
      {
        description:
          'A first path for readers who are learning the basic shape of Christian faith.',
        label: 'Foundations for New Believers',
        order: 2,
        slug: 'foundations-for-new-believers',
      },
    ],
    slug: 'how-to-read-the-bible-for-the-first-time',
    studyQuestions: [
      'What has kept you from reading Scripture consistently?',
      'Why might starting with the Gospels help a new reader?',
      'Which reading step is newest to you?',
      'What should you do when a passage confuses you?',
      'What time and place will you choose this week?',
    ],
    subtitle: 'A practical guide for someone who has never opened the Scriptures seriously',
    tags: ['Bible', 'Scripture', 'reading plan', 'spiritual growth', 'new believer'],
    title: 'How to Read the Bible for the First Time',
    topic: ['Bible Reading', 'Scripture', 'Spiritual Growth'],
  },
  {
    audience: ['New Believers'],
    author: 'Pastoral Desk',
    body: [
      {
        heading: 'The Church Is a People',
        body: [
          'The New Testament church is not primarily a building or a service. It is a people called out by God and gathered around Christ.',
          'Rejecting unhealthy churches is not the same as rejecting the church itself. Bad food does not mean food is unnecessary.',
        ],
      },
      {
        heading: 'What You Cannot Get Alone',
        body: [
          'You need teaching you did not choose, accountability you cannot escape, gifts from other believers, and the ordinances Christ gave to the gathered church.',
          'A podcast can teach, but it cannot know your name, notice your absence, or take the Lord’s Supper with you.',
        ],
      },
      {
        heading: 'What to Look For',
        body: [
          'Look for faithful Bible preaching, gospel centrality, accountable leaders, real community, room for honest questions, and outward-facing mission.',
          'A healthy church is not perfect, but it is a place where people can be known, corrected, forgiven, and helped to endure.',
        ],
      },
    ],
    category: 'Ecclesiology / Church Life',
    excerpt:
      'Following Jesus is personal, but it was never meant to be private. The New Testament knows nothing of a Christian who loves God but has no church.',
    format: 'teaching',
    mainScripture: 'Hebrews 10:24-25; Acts 2:42-47',
    publishedAt: '2026-07-03',
    pullQuote:
      'Christianity without the church is like a coal pulled from the fire. It may glow for a while, but it will go cold.',
    readingMinutes: 15,
    relatedBook: 'Life Together by Dietrich Bonhoeffer',
    relatedResource: 'Questions to Ask When Visiting a Church',
    scriptureText:
      'Let us consider how to stir one another up to love and good works, not neglecting to meet together.',
    series: [
      {
        description:
          'A first path for readers who are learning the basic shape of Christian faith.',
        label: 'Foundations for New Believers',
        order: 3,
        slug: 'foundations-for-new-believers',
      },
    ],
    slug: 'why-the-church-is-not-optional',
    studyQuestions: [
      'What has shaped your view of the local church?',
      'Which Acts 2 element do you most need right now?',
      'Which church need is hardest for you to accept?',
      'What would a healthy church need to look like for you to trust again?',
      'What is your next step toward belonging to a local church?',
    ],
    subtitle:
      'What the local church is, why it matters, and what to look for when you do not have one',
    tags: ['church', 'community', 'fellowship', 'membership', 'discipleship'],
    title: 'Why the Church Is Not Optional',
    topic: ['Church Life', 'Discipleship', 'Community'],
  },
  {
    audience: ['All Believers'],
    author: 'Editorial Team',
    body: [
      {
        heading: 'The Tyranny of the Spectacular',
        body: [
          'Our culture celebrates the dramatic, and the church often absorbs that instinct. But Jesus praises faithful servants, not dramatic ones.',
          'Ordinary obedience is not second-class discipleship. It is often the backbone of a long Christian life.',
        ],
      },
      {
        heading: 'What Boring Faithfulness Looks Like',
        body: [
          'It is Bible reading when you feel nothing, prayer when the words are dry, church attendance when you would rather stay home, and forgiveness when it is costly.',
          'The kingdom advances through millions of ordinary mornings when believers do the next right thing.',
        ],
      },
      {
        heading: 'The Compounding Effect',
        body: [
          'One day of obedience may not feel transformative, but repeated faithfulness forms character over time.',
          'God sees the underground work of roots before anyone else sees fruit.',
        ],
      },
    ],
    category: 'Christian Life / Spiritual Growth',
    excerpt:
      'Nobody writes songs about the person who simply showed up for decades without quitting. But God honors ordinary faithfulness.',
    format: 'reflection',
    mainScripture: 'Luke 16:10',
    publishedAt: '2026-07-04',
    pullQuote:
      'The kingdom of God advances not mostly through dramatic breakthroughs, but through millions of unremarkable mornings.',
    readingMinutes: 12,
    relatedBook: 'Habits of Grace by David Mathis',
    relatedResource: 'A Daily Rhythm Guide',
    scriptureText: 'One who is faithful in a very little is also faithful in much.',
    series: [],
    slug: 'the-boring-faithfulness-god-honors',
    studyQuestions: [
      'What small things is God asking you to be faithful in?',
      'Have you ever felt inferior because your story is not dramatic?',
      'Which ordinary act of obedience is hardest right now?',
      'Where have years of small obedience produced fruit?',
      'What does plodding look like this week?',
    ],
    subtitle:
      'Why the unglamorous rhythms of ordinary obedience are the backbone of the Christian life',
    tags: ['faithfulness', 'perseverance', 'ordinary life', 'obedience'],
    title: 'The Boring Faithfulness God Honors',
    topic: ['Spiritual Growth', 'Faithfulness', 'Obedience'],
  },
  {
    audience: ['All Believers'],
    author: 'Editorial Team',
    body: [
      {
        heading: 'You Are Not the First',
        body: [
          'Many Psalms begin with some version of “God, where are you?” Dry prayer is not evidence that you are the first believer to struggle.',
          'David and the worship leaders of Israel knew seasons where prayer sounded like grief, silence, and waiting.',
        ],
      },
      {
        heading: 'What Romans 8 Promises',
        body: [
          'Paul says the Spirit helps us in our weakness. The help comes because of weakness, not after weakness disappears.',
          'When your prayers collapse into sighs, the Spirit intercedes according to the will of God.',
        ],
      },
      {
        heading: 'Practical Things to Do',
        body: [
          'Pray the Psalms, pray short, sit in silence, write your prayer, or ask another believer to pray with you.',
          'You do not need to fill a time slot. You need to be honest before God.',
        ],
      },
    ],
    category: 'Spiritual Disciplines / Prayer',
    excerpt:
      'Every believer hits seasons where prayer feels pointless, forced, or silent. This is not a sign that God has left.',
    format: 'devotion',
    mainScripture: 'Romans 8:26-27',
    publishedAt: '2026-07-05',
    pullQuote: 'When you cannot find the words, the Spirit is already praying what you need.',
    readingMinutes: 10,
    relatedBook: 'A Praying Life by Paul Miller',
    relatedResource: 'A Guide to Praying the Psalms',
    scriptureText:
      'The Spirit helps us in our weakness. For we do not know what to pray for as we ought.',
    series: [],
    slug: 'what-to-do-when-you-dont-want-to-pray',
    studyQuestions: [
      'When was the last time prayer felt alive to you?',
      'How does Romans 8 change your view of weak prayer?',
      'Which reason for prayerlessness resonates most?',
      'Which practical step will you try this week?',
      'Who could pray with you regularly?',
    ],
    subtitle: 'When prayer feels empty, the Spirit is still speaking',
    tags: ['prayer', 'spiritual dryness', 'Holy Spirit', 'weakness'],
    title: 'What to Do When You Don’t Want to Pray',
    topic: ['Prayer', 'Spiritual Disciplines', 'Holy Spirit'],
  },
  {
    audience: ['All Believers'],
    author: 'Editorial Team',
    body: [
      {
        heading: 'Work Before the Fall',
        body: [
          'God gave Adam work before sin entered the world. Work is not punishment; frustration in work is part of the curse.',
          'To work is to image God by bringing order, beauty, function, and fruitfulness from what He has made.',
        ],
      },
      {
        heading: 'As for the Lord',
        body: [
          'Working for the Lord means doing your work with excellence, integrity, and purpose because Christ is your true master.',
          'Your work serves your neighbor and forms your character in the ordinary pressures of Monday through Friday.',
        ],
      },
      {
        heading: 'When the Job Is Hard',
        body: [
          'A theology of vocation does not mean you must stay forever in a toxic workplace. Wisdom may lead you to change.',
          'But even hard work is not wasted when it is done before Christ with faithfulness.',
        ],
      },
    ],
    category: 'Vocation / Christian Ethics',
    excerpt:
      'If God only cares about ministry, then most of your life is spiritually irrelevant. The Bible tells a different story.',
    format: 'teaching',
    mainScripture: 'Colossians 3:23-24',
    publishedAt: '2026-07-06',
    pullQuote:
      'There is no secular work in the kingdom of God, only sacred work done by people who forget who they work for.',
    readingMinutes: 13,
    relatedBook: 'Every Good Endeavor by Timothy Keller',
    relatedResource: 'A Theology of Work Reading List',
    scriptureText: 'Whatever you do, work heartily, as for the Lord and not for men.',
    series: [],
    slug: 'does-god-care-about-my-work',
    studyQuestions: [
      'Do you view your work as spiritually significant?',
      'How does Genesis 2 change your view of labor?',
      'What would change if Christ was your primary employer?',
      'How does your work serve your neighbor?',
      'What would it mean for your work to become worship?',
    ],
    subtitle: 'Why your Monday morning matters as much as your Sunday morning',
    tags: ['work', 'vocation', 'calling', 'ethics', 'stewardship'],
    title: 'Does God Care About My Work?',
    topic: ['Work', 'Vocation', 'Ethics'],
  },
  {
    audience: ['Married Couples', 'All Believers'],
    author: 'Guest Contributor',
    body: [
      {
        heading: 'Start Where Paul Starts',
        body: [
          'Paul begins with “submitting to one another out of reverence for Christ.” That sentence governs everything that follows.',
          'The spirit of the passage is self-giving love modeled on Christ, not domination or dismissal.',
        ],
      },
      {
        heading: 'What Husbands Are Asked to Do',
        body: [
          'Husbands are commanded to love as Christ loved the church and gave Himself up for her.',
          'If a husband’s first thought is authority rather than sacrifice, he has missed the center of the text.',
        ],
      },
      {
        heading: 'Marriage as Gospel Theater',
        body: [
          'Paul says the mystery refers to Christ and the church. Marriage is a visible picture of the gospel.',
          'This raises the stakes of forgiveness, repentance, respect, and daily service.',
        ],
      },
    ],
    category: 'Marriage / Family',
    excerpt:
      'Few passages have been more misused than Ephesians 5. The actual text describes something far more radical.',
    format: 'teaching',
    mainScripture: 'Ephesians 5:21-33',
    publishedAt: '2026-07-07',
    pullQuote:
      'If a husband reads this passage and his first thought is about his authority, he has not understood a single word.',
    readingMinutes: 14,
    relatedBook: 'This Momentary Marriage by John Piper',
    relatedResource: 'Discussion Guide for Couples: Ephesians 5',
    scriptureText:
      'Submitting to one another out of reverence for Christ. Husbands, love your wives, as Christ loved the church.',
    series: [],
    slug: 'what-submit-to-one-another-actually-means',
    studyQuestions: [
      'What was your first reaction to Ephesians 5?',
      'Why does verse 21 matter for the rest of the passage?',
      'What should husbands think about first?',
      'Where is respect or sacrifice hardest?',
      'How can churches teach this text while protecting vulnerable spouses?',
    ],
    subtitle: 'Understanding Ephesians 5 without dismissing it or weaponizing it',
    tags: ['marriage', 'submission', 'headship', 'love', 'Ephesians'],
    title: 'What “Submit to One Another” Actually Means',
    topic: ['Marriage', 'Family', 'Ephesians'],
  },
  {
    audience: ['Parents', 'Families'],
    author: 'Guest Contributor',
    body: [
      {
        heading: 'What Deuteronomy 6 Describes',
        body: [
          'Moses does not describe a curriculum. He describes a lifestyle where God’s words overflow into ordinary family rhythms.',
          'Sitting, walking, lying down, and rising become places where faith is spoken and practiced.',
        ],
      },
      {
        heading: 'What Children Need',
        body: [
          'Children do not need flawless parents. They need real parents who love God visibly, fail openly, and repent honestly.',
          'An apology from a parent can teach the gospel more clearly than a performance of perfection.',
        ],
      },
      {
        heading: 'The Long Game',
        body: [
          'Parenting is stewardship, not control. You plant and water, but God gives growth.',
          'The same grace that saved you covers the slow, imperfect labor of raising children.',
        ],
      },
    ],
    category: 'Family / Parenting',
    excerpt:
      'Christian parents carry a quiet fear that they will ruin their children spiritually. Scripture calls them to faithfulness, not flawlessness.',
    format: 'reflection',
    mainScripture: 'Deuteronomy 6:4-9',
    publishedAt: '2026-07-08',
    pullQuote: 'Your children do not need a perfect parent. They need a real one.',
    readingMinutes: 13,
    relatedBook: 'Shepherding a Child’s Heart by Tedd Tripp',
    relatedResource: 'A Simple Family Worship Guide',
    scriptureText:
      'You shall teach them diligently to your children, and shall talk of them when you sit in your house.',
    series: [],
    slug: 'parenting-without-perfection',
    studyQuestions: [
      'What is your biggest fear as a Christian parent?',
      'Where can Deuteronomy 6 fit into your actual routine?',
      'When did you last apologize to your child?',
      'How do you distinguish faithfulness from outcomes?',
      'What is the simplest step for family worship this week?',
    ],
    subtitle: 'Why your children need your faithfulness more than your flawlessness',
    tags: ['parenting', 'family', 'discipleship', 'children', 'Deuteronomy 6'],
    title: 'Parenting Without Perfection',
    topic: ['Parenting', 'Family', 'Discipleship'],
  },
  {
    audience: ['Pastors', 'Elders', 'Church Leaders'],
    author: 'Pastoral Desk',
    body: [
      {
        heading: 'What Paul Actually Lists',
        body: [
          'When Paul describes elder qualifications, almost every requirement is character: above reproach, faithful, sober-minded, gentle, not greedy, hospitable.',
          'Only one major skill appears: able to teach. Even that skill serves the trustworthy handling of Scripture.',
        ],
      },
      {
        heading: 'What Is Missing',
        body: [
          'Paul does not list charisma, platform, strategic vision, or organizational brilliance.',
          'The church does not need more talented leaders as much as it needs trustworthy ones.',
        ],
      },
      {
        heading: 'A Word to Aspiring Leaders',
        body: [
          'If you desire eldership, start with your own soul, marriage, household, generosity, patience, and accountability.',
          'The question is not whether sheep will be impressed. The question is whether sheep will be safe in your care.',
        ],
      },
    ],
    category: 'Pastoral Theology / Church Leadership',
    excerpt:
      'When Paul lists qualifications for elders, he mentions almost no skills. Nearly every requirement is about character.',
    format: 'teaching',
    mainScripture: '1 Timothy 3:1-7; Titus 1:5-9',
    publishedAt: '2026-07-09',
    pullQuote: 'The church does not need more talented leaders. It needs more trustworthy ones.',
    readingMinutes: 15,
    relatedBook: 'Biblical Eldership by Alexander Strauch',
    relatedResource: 'Elder Self-Assessment Checklist',
    scriptureText:
      'An overseer must be above reproach, sober-minded, self-controlled, respectable, hospitable, able to teach.',
    series: [
      {
        description: 'A path for pastors, elders, teachers, and those learning to shepherd others.',
        label: 'Shepherding the Church',
        order: 1,
        slug: 'shepherding-the-church',
      },
    ],
    slug: 'the-elders-first-qualification-is-character-not-skill',
    studyQuestions: [
      'What qualities do you first associate with leadership?',
      'Which qualification surprises you most?',
      'Why is the home a proving ground for church leadership?',
      'Why is a recent convert at risk?',
      'Which qualification do you need to grow in most?',
    ],
    subtitle: 'What the Bible actually requires of church leaders',
    tags: ['eldership', 'leadership', 'character', '1 Timothy', 'Titus'],
    title: 'The Elder’s First Qualification Is Character, Not Skill',
    topic: ['Eldership', 'Leadership', 'Pastoral Theology'],
  },
  {
    audience: ['Pastors', 'Elders', 'Preachers'],
    author: 'Pastoral Desk',
    body: [
      {
        heading: 'Paul’s Confession',
        body: [
          'Paul came to Corinth in weakness and fear and much trembling. He was not performing false humility; he was telling the truth.',
          'That weakness was not a failure of strategy. It was part of the strategy.',
        ],
      },
      {
        heading: 'Why Weakness Is the Point',
        body: [
          'Paul decided to know nothing among them except Jesus Christ and Him crucified so their faith would rest on God’s power, not human wisdom.',
          'Your inadequacy is not an obstacle to preaching. It can be the channel through which God’s power is more clearly seen.',
        ],
      },
      {
        heading: 'Faithful Preaching',
        body: [
          'Preaching is built on faithful exegesis, clear proclamation, personal application, and dependence on the Spirit.',
          'The congregation does not need your strength. They need God’s Word carried by God’s Spirit.',
        ],
      },
    ],
    category: 'Pastoral Theology / Preaching',
    excerpt:
      'If you preach and feel unqualified, you are in good company. Paul came to Corinth in weakness and fear.',
    format: 'reflection',
    mainScripture: '1 Corinthians 2:1-5',
    publishedAt: '2026-07-10',
    pullQuote:
      'Your inadequacy is not an obstacle to effective preaching. It is a prerequisite for it.',
    readingMinutes: 13,
    relatedBook: 'The Supremacy of God in Preaching by John Piper',
    relatedResource: 'A Preacher’s Weekly Preparation Checklist',
    scriptureText: 'I was with you in weakness and in fear and much trembling.',
    series: [
      {
        description: 'A path for pastors, elders, teachers, and those learning to shepherd others.',
        label: 'Shepherding the Church',
        order: 2,
        slug: 'shepherding-the-church',
      },
    ],
    slug: 'how-to-preach-when-you-feel-unqualified',
    studyQuestions: [
      'How do you respond when you feel unqualified?',
      'What does it mean to know Christ crucified in preaching?',
      'Which compensation are you most tempted by?',
      'How do you distinguish humility from destructive self-doubt?',
      'What would change if you trusted the Spirit more than your performance?',
    ],
    subtitle: 'Paul planted churches across the Roman Empire and still felt inadequate',
    tags: ['preaching', 'ministry', 'weakness', 'Holy Spirit', '1 Corinthians'],
    title: 'How to Preach When You Feel Unqualified',
    topic: ['Preaching', 'Pastoral Ministry', 'Weakness'],
  },
  {
    audience: ['All Believers'],
    author: 'Pastoral Desk',
    body: [
      {
        heading: 'What Paul Does Not Say',
        body: [
          'Paul does not say money is the root of all evil. He says the love of money is a root of all kinds of evils.',
          'Money is a tool. The moral danger is in the heart of the person holding it.',
        ],
      },
      {
        heading: 'Desire, Contentment, Generosity',
        body: [
          'Paul warns those who desire to be rich, teaches godliness with contentment, and instructs the rich to be generous and ready to share.',
          'The issue is not only how much you have, but what your money has of you.',
        ],
      },
      {
        heading: 'Practical Wisdom',
        body: [
          'Give first, live below your means, hold plans loosely, examine your heart, and be generous toward the poor.',
          'We leave every dollar behind, but generosity stores up treasure in the only place that lasts.',
        ],
      },
    ],
    category: 'Ethics / Stewardship',
    excerpt:
      'The Bible does not condemn wealth. It condemns the love of wealth. The difference matters for every believer.',
    format: 'teaching',
    mainScripture: '1 Timothy 6:6-10, 17-19',
    publishedAt: '2026-07-11',
    pullQuote:
      'The question is never “How much do you have?” The question is always “What does it have of you?”',
    readingMinutes: 14,
    relatedBook: 'The Treasure Principle by Randy Alcorn',
    relatedResource: 'A Stewardship Self-Assessment',
    scriptureText:
      'Godliness with contentment is great gain... They are to do good, to be rich in good works, to be generous and ready to share.',
    series: [],
    slug: 'is-it-wrong-to-be-wealthy',
    studyQuestions: [
      'What does the love of money look like in your own life?',
      'How does Paul’s baseline for contentment compare to yours?',
      'How do you distinguish planning from accumulation?',
      'What might Jesus be asking you specifically to surrender?',
      'How much of your giving flows toward those with less?',
    ],
    subtitle: 'What the Bible actually says about money',
    tags: ['money', 'wealth', 'stewardship', 'generosity', 'contentment'],
    title: 'Is It Wrong to Be Wealthy?',
    topic: ['Money', 'Stewardship', 'Ethics'],
  },
]

export function buildArticleUrl(slug: string) {
  return `/articles/${slug}`
}
