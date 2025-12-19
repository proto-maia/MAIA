# Threat Modeling

## Introduction

As mentioned numerous times in the first chapter, security is about making rational choices, about what possible threats you face, and what
are the proper mitigations for these. It is _possible_, but not easy, to just improvise this. However, for most, that would lead to
mistakes. Instead, we can use a process called Threat Modeling to help us. This process is a tool - something that can be used to make it
more likely to succeed, and to simplify your strategy.

The output of the process of Threat Modeling is called a Threat Model. This should be a living document, something that you can continuously
update. You can also have more than one model - each one for different contexts or circumstances. For example, you can have one for your
regular life, one for when you're traveling, and one for a specific project you are part of.

This chapter will not be able to teach you everything about threat modeling. It is a very large subject. To start with, I recommend the book
Threat Modeling by Adam Shostack. This is geared towards modeling in a software devcelopment context, so is slightly different from the more
generic approach I describe here.

My goal with this chapter is to describe how I think about threat modeling, for myself, for the purpose of modeling for OpSec. The process
is on purpose quite simple. One of the ways security thinking easily goes wrong is that you think about a specific threat, and come up with
a "story" that sounds likely. But the problem is that when humans think about events from a storytelling perspective, we have a tendency to
get bad at judging probability. We also often miss threats when thinking in stories. So, the approach here is on purpose meant to not use
this kind of thinking.

This kind of modeling can be done in groups, or alone, depending on the purpose of the Threat Model. Doing it collaboratively can often
produce better results, since you are less likely to forget details when you have several people helping.

Since a threat model can sometimes contain sensitive details, it can be a good idea to make sure the information is kept secure. In some
casess this doesn't matter, for exaample if you have an asset where the existence of the asset itself is sensitive, it's worth protecting
the model. Ironically, it might even be a good idea to include the threat model itself as an asset to protect, in your threat model.

The general flow of this style of threat modeling exercise starts by drawing up lists of assets, adversaries and possible attacks. Once you
have these you combine them into a list of risks. Finally, you decide what mitigations, if any, you will apply to the risks. You also should
evaluate the effectiveness of the mitigations.

As with many things in this book, threat modeling will not come naturally to start with. Don't worry, it's natural. It's a good idea to
practice threat modeling several times before using it in reality. It's also a good idea to practice in groups - this helps get new ideas
and approaches to your own modeling.

Remember, threat modeling is a tool. The only goal of it is to help you make better and more rational security choices. If there's something
in here that doesn't work for you - change it. But just make sure you understand why it was there in the first place.


## "Model your assets"

The first step is to think about your assets. These are the things you want to protect - the things that have value. Assets can be anything,
not just physical items. Typical assets might be money, your camera, your life, your freedom, sensitive information, the integrity of data,
or many other things. As you can see, some assets are tactile and tangible, while others are intangible, and more like ideas than
anything. Fundamentally, the goal is to enumerate what you might want to protect in this threat model. If you want you might also assign a
value to each asset. This value is purely relative and is only something you will use to prioritize later.

Sometimes, people have trouble figuring out what good assets are. For example, surveillance cameras that are in place to ensure no one
breaks into your office; is that a good asset? Most of the time, no. We do want to protect the integrity of the cameras, but doing so
doesn't have any value in itself. And it's this idea of intrinsic value that is the most helpful to distinguish good assets from bad
onse. If something is worth protecting in isolation from the rest of the model, it's probably a good asset.

As we talked about earlier, threat models don't have to cover everything. You can have several models for different pruposes. So while in
your personal threat model, your bank account and personal belongings are likely to be good assets, you probably don't need to include them
when doing a model for your political protest group.

One common question is at what granularity to model your assets. For example, should you have one asset for all your belongings, or one
asset for each one of them? First, having too many assets will generally make the model quite unweildy, so it's better to not go overboard
here. But the real answer to this question is that the right granularity is whatever makes the threat model better, and more
useful. Remember, it's a tool, and the goal of the tool is to allow you to make better decisions about how to protect yourself. After
practicing a few times, you will quickly discover that you get better at choosing useful assets.

One other thing you will quickly notice is that in many cases you will have a lot of shared assets. There will be unique ones too, but the
sharing is very common. The reason is simple - we have shared concerns that we have to take into account no matter the context. So assets
like your health and life, your job security, your freedom, and the same for your friends, family and colleauges will almost always show
up. That's completely fine. If some of these don't warrant specific mitigations, they will disappear later in the process. If you're in
doubt about adding an asset, it's better to add it; it will not cause problems later.


## "Think about your adversaries"

One thing that makes security different from other fields, such as resilience engineering and disaster planning, is that in security
someone is working against us. If there is no other party, you don't need security. So, an integral part of threat modeling is to think
about the possible opposite party. These can be thought of as antagonists, enemies or opposits. Here we will use the term adversary.

An adversary has intention. They are actively or passively acting out threats against your assets. Because of intentionality, animals are
not adversaries. Nature is not. In general, your family won't be either, unless there's a risk they will actively work against your
interests. A spouse that endanger your health by mistake is not an adversary. However, spouses and other family members _can_ be thought of
as adversaries in some contexts, for example, in the setting of spousal abuse.

Just as with the assets, start by creating a list. For now, don't think about _how_ they could attack you. Simply consider any entity,
person or organization, that could have the possibility of being a threat. It could be really farfetched - just as with assets, the less
likely alternatives will disappear later. For now, it's more important to be comprehensive, so you don't miss an adversary that could be a
real problem for you later.

While doing the list, think about how powerful you think the adversary is, and assign a score for that. 1-5 works fine for this. This is
just to make it easier later to think about whether a specific adversary is powerful enough to actually instigate a specific type of attack.

The same advice as for assets are true for adversaries. Granularity only matters as far as it helps you make better mitigation decisions
later. And in fact, many mitigations are independednt of adversary.

You will also find many shared adversaries. Gangs and criminals of different types will likely show up on most lists. As usual, that's
fine. They will disappear later if not useful.

When thinking about adversaries, try to avoid thinking about motivations. Don't think too much about the assets at this stage. The _why_ of
an adversary can constrain your thinking and you will miss mitigations that would have been really valuable to consider. When thinking about
mitigations, our brains can easily enter storytelling mode, and as I mentioned before, this interferes with brainstorming all possibilities.

This is a mistake I myself did. I never considered the Ecuador government a potential adversary. During the Correa administration this was
probably correct, but when Moreno took power and the internal political situation changed, I should have noticed and updated my model. But
even that is the wrong perspective. Ecuador should have been on my list as a potential advesary, no matter the _why_ or _why not_. For the
simple reason that this would have made it possible for me to have a better threat model. Live and learn.


## "Analyze possible threats and attacks"

The next step is to start thinking about different kinds of threats or attacks against the assets. At this point, it's best to ignore the
adversaries. Just go through each of the assets and think about different ways that specific asset could be threatened. In this stage it's
usually good to be as detailed as possible, and come up with as many attacks as possible.

As usual, try to avoid getting into story telling mode. As with assets and adversaries, this can lead to missing aspects.

The biggest problem with this stage is that it sometimes requires creativity, and sometimes knowledge, to come up with proper threats. There
are some techniques that can be used to help draw out potential ideas. One technique is called Attack Trees. With this, you start with a
high level goal and then repeatedly ask yourself how to achieve that goal. By doing this over and over you will go from generic attacks to
very specific ones.

Another tool is to use taxanomies of types of attacks. By using these you will get reminded of the possible ways attacks can be
perpetrated. One is called STRIDE. It's been used specifically for information security threats. I have also used another one, called
JURIST. This is more generic and applies to anything you might encounter in OpSec.

(TODO: SIDEBAR explain STRIDE)
(TODO: SIDEBAR explain JURIST)

Rembember, these are tools. The purpose is for you to come up with useful threats. And honestly, it doesn't matter what techniques you use -
if the result is a comprehensive list of threats, that's all that matters. As with the other aspects of threat modeling, you will need to
practice finding good threats. Even more than wwith the other steps, you will benefit a lot from doing this step with other people. Everyone
will bring different knowledge and experience to this step and you'll be able to apply these learnings the next time you do this step.


## "Combine it all into a risk table"

You should now have 3 tables, one with assets, one with adversaries, and one with specific threats against assets. The next step is to
combine the threats with specific adversaries. The way to do that is to simply go through each adversary, and for each one go through the
list of threats. If you think there's any possibility of that adversary executing that threat, add it to the risk table. Finally, for each
entry in the risk table, figure out two numbers.

The first one is the probability of that adversary executing that threat. When considering this number, you finally think about
motivations. Basically, you have to ask if the adversary has any interest in the asset, for some reason, and whether the adversary has the
capability to execute the threat.

The second number is the impact. Basically, if the threat is executed, how bad would it be. Use a relative scale, something like 1-5 or
1-10. For many threats this number will be independent of the adversary, but in some cases it does matter - that's why we have it here.

If you want, you can now filter the list of risks for the first time. You can remove risks with really low probability, or with very low
impact. It's also fine to keep it until the next step.

You should sort the list in descending order, of the combination of probability and impact. This is the order we will start looking at the
risks.


## "Come up with proper mitigations"

Now that we know what the risks are, and we know the most important ones, we can start thinking about mitigations. This is the part of
threat modeling that requires practical security knowledge - something the rest of this book willl hopefully give you. So for now, we will
continue talking about the process, but not about specific mitigations.

For each risk, you will first decide what to do about it. Fundamentally, there are three basic responses to a risk. You can mitigate it, you
can transfer it, or you can accept it. Mitigate it means you come up with one or more measures that you will take, and these measures will
reduce either the probability, or the impact - or both - of a risk. It's important to remember that you can never mitigate a risk
completely, and it's usually not worthwhile to try. You can also implement more than one mitigation. Say you are worried about being robbed
by a regular street robber. You can implement three diferent mitigations against this risk. The first is that you avoid walking in sketchy
parts of the city. This will reduce the probability, but not the impact. The other two mitigations are focused on the impact. First, you'll
only have a limited amount of money on the debit card you have in your wallet. This means you won't lose your life savings if the robber
gets the card and uses it. Second, you will have another card that you keep at home, so even if you lose your wallet, you will still have
access to your money, while waiting for a replacement card.

Transferring a risk is basically saying it is someone else's problem. You are not ignoring the risk, just noting that you can't do much
about it. For example, there are many risks related to debit cards that we don't think about. Instead we transfer these risks to our banks.

The final approach is to accept the risk. If we can come up with good mitigations, or it's a risk we are willing to take, accepting it is
fine.

Note that in this stage you are just coming up with _potential_ mitigations. We still haven't decided which mitigations to actually use or
not.

In many cases, the same mitigation will apply to several different risks. It's still valuable to keep track of what mitigiations are for
which risk - this will help later when updating the threat model.


## "Evaluate and decide on mitigations"

Once you have your list of potential mitigations, you need to go through them all and evaluate them. The first step is to go through each
mitigation and think about the cost for it - in terms of money, effort, inconvenience - anything that is relevant. Once you've done that,
you should go through each risk again. This time, look at the potential mitigations and evaluate how effective each mitigation would
be. Finally decide on which mitigations to adopt based on the cost and potential effectiveness. At the end, you'll have a list of
mitigations to implement in your OpSec strategy. That marks the end of the exercise.

As mentioned earlier, threat modeling has to be a living process - something to be revisited over and over. This can be done when your
circumstances change, or just enough time has passed. But when it comes to mitigations it's important to revisit your model often,
especially after the first modeling, when you have just implemented mitigations.

When you revisit your mitigations you need to ask yourself if you evaluated the cost correctly. You also need to see if you were wrong about
the effectiveness. It's fine to be wrong about these things. You will continue to learn as you get more practice and experience. Just
revisit the model reasonably often and if things change, just update it.


## "Sometimes a threat stance is OK"

All of what I've just described sounds like a lot of work, and it can be. There's a reason for doing it this way though - you want to make
sure you don't miss anything important. But do you always have to do this process? Do I always do it? The answer is no. When you have enough
experience and instinct, you can sometimes jump over the full threat model and simplify things a bit. Just remember, you do take an
additional risk by short-circuiting the process.

One area where it can often be reasonably safe to not go through the full threat model is in the area I call Security Hygiene. Just as you
don't need to do a deep analysis of whether you should use soap when washing your hands, there are basic aspects of security that in general
everyone should do. Things like proper passwords, encrypted harddrives and backups are so fundamental that you don't need to do a threat
model to decide to use them. You _can_ do it, though, and I recommend you try it. It will help you deeply understand the logic why these
measures are so important.

For more complicated subjects, you can adopt what I call a Threat Stance. This is a radically simplified threat model, where you don't make
explicit most things. The assumption is that you know your assets pretty well already, and you also understanad the likely risks. A threat
stance is basically a generic set of mitigations that you through experience has decided are likely to provide you with good enough
protection against the risks you worry about.

Ideally, if you do a full threat modeling exercise, you would end up with more or less the same mitigations as you have in your threat
stance. In practice, experienced security practicioners will end up with threat stances that are too strong - overkill. If it's not too
much, this is fine. But as mentioned earlier, mitigations have cost - so if you use too strong mitigations, it will constrain your ability
to act. If you feel like this has happened, take a step back and do a proper threat modeling.

When you're starting out, never use threat stances. Learn how to do a threat modeling properly first. Practice and make sure you understand
them deeply.

After that, you can start experimenting with simplifiying the process, and relying more on your instincts. But when in doubt, take a step
back and use the full process.


## Conclusion

Threat modeling, implicit or explicit, is at the core of security. I have said many times that proper security is relative, it's not
perfect - and it's practical. Threat modeling is what makes it all those things. This is where you take the first step from the mindset and
start thinking about how this applies to the real world, and to your situation.

Security is also dependent on context, and once again, threat modeling is how that happens.

Reading this chapter won't make you an expert in threat modeling. To do it properly, you need all kinds of knowledge - some of it in this
book, some elsewhere. But even with that knowledge you will still need to practice. Threat modeling is a skill, and it doesn't come
naturally. I have met many great security people who have no feeling for threat modeling at all - because they never did it. And as a
consequence, they propose mitigations that are completely wrong and miss obvious risks. Don't be like that. Put the practice of threat
modeling at the foundation of your security life.

And don't forget to practice, diligently.
