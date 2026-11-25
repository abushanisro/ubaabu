import type { GermanHubContent, GermanPageExpansion } from './contentTypes'

/**
 * German (de-DE) long-form content for the /de hub and the five German detail pages.
 * Case studies linked here are English-language pages and are labelled as such.
 */

export const DE_HUB: GermanHubContent = {
  title: 'Should-Cost-Analyse und Lieferantenintelligenz | Emithran',
  description:
    'Emithran verbindet Stücklisten, Should-Cost-Modelle und Lieferantendaten für Einkauf und Engineering in der DACH-Region – mit Standortvergleich Indien.',
  h1: 'Fertigungsintelligenz für Kosten, Lieferanten und Stücklisten',
  intro:
    'Emithran ist eine KI-gestützte Plattform für Fertigungsintelligenz. Sie verbindet Stücklisten, Should-Cost-Modelle und Lieferantendaten in einem System, damit Einkaufs- und Engineering-Teams in Deutschland, Österreich und der Schweiz Angebote prüfen, Standorte vergleichen und Sourcing-Entscheidungen nachvollziehbar begründen können. Das Unternehmen wurde 2023 in Bangalore gegründet und arbeitet mit Herstellern aus Automotive, Luft- und Raumfahrt, Verteidigung und Präzisionsfertigung.',
  summary:
    'Kurz gesagt: Emithran berechnet, was ein Bauteil kosten sollte, prüft Lieferantenangebote Position für Position und zeigt qualifizierte Alternativlieferanten in Europa und Indien. Sieben verbundene Module nutzen dieselbe Datenbasis aus Stückliste, über 500 Fertigungsprozessen und mehr als 72.000 Lieferantendatensätzen. Ein fokussierter Pilot lässt sich in etwa fünf Tagen aufsetzen.',
  modules: [
    {
      heading: 'BOM Intelligence',
      body: 'Importiert Stücklisten aus Excel oder CSV, erkennt Dubletten, fehlende Angaben und inkonsistente Einheiten und verknüpft jede Position mit Kosten- und Lieferantendaten. Für validierte Programme gilt ein Zielwert von 99,4 % Stücklistengenauigkeit.',
    },
    {
      heading: 'Should-Cost-Analyse',
      body: 'Baut Kostenmodelle bottom-up aus Material, Prozessschritten, Taktzeiten, Maschinenstundensätzen, Rüstkosten und Gemeinkosten auf – als prüfbare Grundlage für Zielpreise und Verhandlungen.',
    },
    {
      heading: 'Supplier Radar',
      body: 'Durchsucht mehr als 72.000 Lieferantendatensätze nach Prozessfähigkeit, Zertifizierung und Region und liefert Shortlists für Angebotsanfragen und Dual-Sourcing.',
    },
    {
      heading: 'VAVE Studio',
      body: 'Bewertet Design- und Werkstoffalternativen nach ihrer Kostenwirkung, damit Wertanalyse und Wertgestaltung auf Zahlen statt auf Annahmen beruhen.',
    },
    {
      heading: 'Quality Guard',
      body: 'Führt Qualitätsdaten, Zertifikate und Abweichungen je Lieferant und Bauteil zusammen, sodass Qualitätsrisiken vor der Vergabe sichtbar sind.',
    },
    {
      heading: 'Launch Tracker',
      body: 'Verfolgt Anlaufaktivitäten neuer Bauteile und Programme, damit offene Punkte zwischen Engineering, Einkauf und Lieferant nicht in E-Mail-Verläufen verschwinden.',
    },
    {
      heading: 'Shipment Hub',
      body: 'Macht Sendungen und Lieferstatus transparent und ergänzt die Kostenbetrachtung um die Logistikseite internationaler Lieferketten.',
    },
  ],
  sections: [
    {
      heading: 'Warum Should-Cost für den Einkauf in der DACH-Region',
      paragraphs: [
        'Should-Cost gibt dem Einkauf eine eigene, technisch begründete Kostenbasis, bevor er über Preise verhandelt. Statt ein Angebot nur gegen das Vorjahr oder gegen ein zweites Angebot zu halten, sieht das Team, welcher Anteil auf Material, Fertigung, Rüsten, Gemeinkosten und Marge entfällt.',
        'Für Hersteller in Deutschland, Österreich und der Schweiz ist das besonders relevant, weil Energie-, Lohn- und Materialkosten in den letzten Jahren häufig Anlass für Preiserhöhungsforderungen waren. Ein Kostenmodell zeigt, ob eine geforderte Erhöhung zur tatsächlichen Kostenstruktur des Bauteils passt, und macht das Gespräch mit dem Lieferanten sachlich statt positionell.',
      ],
    },
    {
      heading: 'Standortvergleich Deutschland – Indien',
      paragraphs: [
        'Emithran vergleicht dasselbe Bauteil mit demselben Prozess an zwei Standorten, jeweils mit eigenen Annahmen für Löhne, Energie, Maschinenstundensätze und Logistik. So wird sichtbar, ob eine Verlagerung oder ein zweiter Lieferant in Indien nach Fracht, Zoll und Qualitätsaufwand tatsächlich günstiger ist.',
        'Der Vergleich endet nicht beim Stückpreis. Supplier Radar liefert für den betrachteten Prozess eine Shortlist qualifizierter Lieferanten, inklusive Zertifizierungsstatus wie IATF 16949 oder AS9100. Damit entsteht eine belastbare Grundlage für eine Dual-Sourcing-Entscheidung statt einer reinen Rechenübung.',
      ],
    },
    {
      heading: 'Pilot in fünf Tagen',
      paragraphs: [
        'Ein fokussierter Pilot lässt sich in etwa fünf Tagen aufsetzen, wenn das Team repräsentative Zeichnungen, eine Stückliste und eine konkrete Fragestellung mitbringt. Typische Fragestellungen sind eine laufende Preisverhandlung, eine Verlagerungsprüfung oder die Suche nach einem Zweitlieferanten.',
        'Wie lange die anschließende Auswertung dauert, hängt von der Anzahl der Bauteile und Prozesse ab. Ergebnis ist ein dokumentierter Vorher-Nachher-Vergleich von Kosten und Lieferantenoptionen, den Einkauf und Engineering intern weiterverwenden können.',
      ],
    },
  ],
  proof: {
    heading: 'Ergebnisse aus Fallstudien',
    items: [
      {
        title: 'Indien vs. Belgien: 38 % geringere Landed Costs bei Lkw-Rahmenlängsträgern',
        body: 'Ein Standortvergleich für Fahrgestellträger schwerer Nutzfahrzeuge zwischen Indien und Belgien, inklusive Logistik. Fallstudie (englisch).',
        href: '/case-studies/chassis-india-belgium',
      },
      {
        title: 'Abgasanlage: Titan vs. Edelstahl, 1,3 Mio. £ Einsparung pro Jahr',
        body: 'Should-Costing einer Abgasanlage mit Werkstoffvergleich als Grundlage für die Entscheidung. Fallstudie (englisch).',
        href: '/case-studies/exhaust-system',
      },
      {
        title: 'Luftfahrt-DC-DC-Wandler: 22 % geringere Stückkosten durch VAVE',
        body: 'Wertanalyse an einer Leistungselektronik-Baugruppe für die Luftfahrt. Fallstudie (englisch).',
        href: '/case-studies/dc-dc-converter',
      },
    ],
  },
  faqs: [
    {
      question: 'Was macht Emithran?',
      answer:
        'Emithran verbindet Stücklisten, Should-Cost-Modelle und Lieferantendaten in einer Plattform. Einkauf und Engineering sehen, was ein Bauteil kosten sollte, wie ein Angebot davon abweicht und welche qualifizierten Alternativlieferanten es gibt.',
    },
    {
      question: 'Ist die Plattform auf Deutsch verfügbar?',
      answer:
        'Diese Seiten stellen Emithran auf Deutsch vor. Fallstudien und viele Fachartikel sind derzeit auf Englisch. Welche Teile der Anwendung in welcher Sprache bereitstehen, klären wir in der Demo.',
    },
    {
      question: 'Ersetzt Emithran unser ERP- oder PLM-System?',
      answer:
        'Nein. Emithran arbeitet neben ERP und PLM. Stücklisten lassen sich aus Excel oder CSV importieren, und für weitere Anbindungen steht eine API zur Verfügung.',
    },
    {
      question: 'Können wir deutsche und indische Fertigungskosten vergleichen?',
      answer:
        'Ja. Dasselbe Bauteil wird mit standortspezifischen Annahmen für Lohn, Energie und Logistik modelliert, sodass der Vergleich auf gleicher Prozessbasis erfolgt.',
    },
    {
      question: 'Wie läuft ein Pilot ab?',
      answer:
        'Sie wählen eine Handvoll repräsentativer Bauteile und eine konkrete Fragestellung. Das Setup dauert für ein fokussiertes Team etwa fünf Tage, danach folgt die Auswertung von Kosten und Lieferantenoptionen.',
    },
    {
      question: 'Was kostet Emithran?',
      answer:
        'Die Preisgestaltung hängt von Umfang und Modulen ab und wird in der Demo besprochen. Einen Überblick über die Pakete finden Sie auf der Preisseite unter /pricing.',
    },
  ],
  cta: {
    heading: 'Pilot mit Ihren eigenen Bauteilen besprechen',
    body: 'Bringen Sie eine Stückliste oder ein aktuelles Angebot mit. In der Demo zeigen wir, wie Emithran die Kostenstruktur aufschlüsselt, Lieferantenalternativen findet und wie ein Pilot für Ihr Team aussehen kann.',
  },
}

const COLUMNS = ['Fähigkeit', 'Excel', 'ERP-Modul', 'Emithran']

export const DE_EXPANSIONS: Record<string, GermanPageExpansion> = {
  'should-cost-analysis-software': {
    summary:
      'Should-Cost-Analyse-Software berechnet bottom-up, was ein Bauteil aus Material, Prozess, Arbeitszeit, Rüsten und Gemeinkosten kosten sollte. Emithran vergleicht dieses Modell Position für Position mit Lieferantenangeboten, rechnet Standorte wie Deutschland und Indien im selben Modell durch und liefert eine prüfbare Grundlage für Zielpreise und Verhandlungen.',
    walkthrough: {
      heading: 'So entsteht ein Should-Cost-Modell in Emithran',
      intro:
        'Ein Kostenmodell entsteht in fünf Schritten, von der Zeichnung bis zur Verhandlungsunterlage. Jeder Schritt bleibt dokumentiert, damit Einkauf und Engineering dieselben Annahmen sehen. Für den Einstieg genügt ein einzelnes Bauteil mit Zeichnung und aktuellem Angebot.',
      steps: [
        {
          title: 'Daten erfassen',
          body: 'Zeichnung, Stücklistenposition und, falls vorhanden, das aktuelle Lieferantenangebot werden importiert. Stücklisten kommen aus Excel oder CSV.',
        },
        {
          title: 'Prozessroute festlegen',
          body: 'Aus über 500 Fertigungsprozessen wird die Route gewählt, etwa Drehen, Fräsen, Wärmebehandlung und Oberflächenbehandlung. Taktzeiten und Rüstzeiten werden je Schritt hinterlegt.',
        },
        {
          title: 'Kostentreiber bewerten',
          body: 'Material inklusive Verschnitt, Maschinenstundensätze, Arbeitszeit, Werkzeugkosten, Gemeinkosten und Marge werden getrennt ausgewiesen, jeweils mit standortspezifischen Annahmen.',
        },
        {
          title: 'Angebot abgleichen',
          body: 'Das Modell wird mit dem Angebot verglichen. Abweichungen werden je Kostenblock sichtbar, nicht nur als Differenz im Endpreis.',
        },
        {
          title: 'Verhandlung vorbereiten',
          body: 'Die Kostenaufschlüsselung wird mit Sensitivitäten für Losgröße, Werkstoff und Standort exportiert und dient als sachliche Grundlage für das Lieferantengespräch.',
        },
        {
          title: 'Modell pflegen',
          body: 'Nach der Verhandlung bleibt das Modell mit Bauteil und Lieferant verknüpft. Ändern sich Materialpreise oder Losgrößen, wird es aktualisiert und dient bei der nächsten Preisrunde erneut als Referenz.',
        },
      ],
    },
    useCases: {
      heading: 'Einsatz nach Branche',
      items: [
        {
          industry: 'Automotive-Zulieferer',
          body: 'Preiserhöhungsforderungen mit Verweis auf Energie oder Material lassen sich gegen die tatsächliche Kostenstruktur prüfen. Für Serienteile ist der Standortvergleich Deutschland–Indien oft die zentrale Frage, etwa bei Dreh-, Guss- und Blechteilen mit hohem Lohnanteil.',
        },
        {
          industry: 'Luft- und Raumfahrt',
          body: 'Kleine Losgrößen, Titan- und Nickelbasislegierungen und hohe Buy-to-Fly-Verhältnisse verändern die Kostenlogik. Das Modell verteilt Rüst- und Prüfaufwand korrekt auf kleine Stückzahlen.',
        },
        {
          industry: 'Verteidigung',
          body: 'Bei Programmen mit wenigen qualifizierten Anbietern fehlt oft der Wettbewerb als Preisregulativ. Ein unabhängiges Kostenmodell ersetzt ihn teilweise und dokumentiert die Begründung.',
        },
        {
          industry: 'Maschinenbau und Präzisionsfertigung',
          body: 'Bei hoher Variantenvielfalt hilft das Modell, Teilefamilien konsistent zu bewerten und Ausreißer im Angebotsspiegel schnell zu erkennen.',
        },
      ],
    },
    proof: {
      heading: 'Belege aus Fallstudien',
      items: [
        {
          title: 'Abgasanlage: Titan vs. Edelstahl',
          body: 'Should-Costing mit Werkstoffvergleich; ausgewiesene Einsparung von 1,3 Mio. £ pro Jahr. Fallstudie (englisch).',
          href: '/case-studies/exhaust-system',
        },
        {
          title: 'Lkw-Rahmenlängsträger: Indien vs. Belgien',
          body: 'Standortvergleich mit 38 % geringeren Landed Costs. Für europäische Einkaufsteams zeigt die Studie, wie Fracht und Logistik in den Vergleich einfließen. Fallstudie (englisch).',
          href: '/case-studies/chassis-india-belgium',
        },
        {
          title: 'LCV-Hinterachse: 244 $ pro Baugruppe',
          body: 'Vollständiges Should-Cost-Modell einer Hinterachsbaugruppe für leichte Nutzfahrzeuge. Fallstudie (englisch).',
          href: '/case-studies/rear-axle-should-cost',
        },
      ],
    },
    comparison: {
      heading: 'Excel, ERP-Modul oder Emithran',
      intro:
        'Viele Teams beginnen mit Excel oder der Kalkulation im ERP. Die Tabelle zeigt, wo die Unterschiede für Should-Cost-Arbeit liegen. Excel bleibt für Einzelbetrachtungen nützlich, stößt aber bei vielen Bauteilen und mehreren Standorten an Grenzen.',
      columns: COLUMNS,
      rows: [
        ['Bottom-up-Kostenmodell je Bauteil', 'Manuell, je Datei', 'Meist Standardkosten, keine Prozessmodellierung', 'Ja, mit Prozessroute und Kostentreibern'],
        ['Prozess- und Maschinendaten', 'Eigene Pflege', 'Eigene Stammdaten', 'Über 500 Prozesse hinterlegt'],
        ['Angebotsabgleich je Kostenblock', 'Manuell', 'Nicht vorgesehen', 'Ja'],
        ['Standortvergleich Deutschland–Indien', 'Separate Tabellen', 'Nicht vorgesehen', 'Im selben Modell'],
        ['Verknüpfung mit Lieferantendaten', 'Nein', 'Lieferantenstamm, keine Fähigkeitsdaten', 'Ja, über Supplier Radar'],
        ['Nachvollziehbarkeit der Annahmen', 'Abhängig von der Disziplin des Erstellers', 'Teilweise', 'Dokumentiert je Modell'],
      ],
    },
    faqs: [
      {
        question: 'Worin unterscheidet sich Should-Cost von einer Kalkulation im ERP?',
        answer:
          'Die ERP-Kalkulation bildet in der Regel Standard- oder Istkosten der eigenen Fertigung ab. Should-Cost modelliert, was ein Bauteil bei einem effizienten Lieferanten kosten sollte, und dient damit als Maßstab für zugekaufte Teile.',
      },
      {
        question: 'Wie genau ist ein Should-Cost-Modell?',
        answer:
          'Die Genauigkeit hängt von der Qualität der Eingangsdaten ab, vor allem von Prozessroute, Taktzeiten und Materialannahmen. Entscheidend ist, dass jede Annahme sichtbar ist und im Gespräch mit dem Lieferanten überprüft werden kann.',
      },
      {
        question: 'Können wir eigene Maschinenstundensätze verwenden?',
        answer:
          'Ja. Standortspezifische Sätze für Maschinen, Arbeit und Energie lassen sich hinterlegen, damit das Modell zu Ihrer Lieferantenbasis passt. Unterschiedliche Sätze für Deutschland und Indien lassen sich parallel führen.',
      },
      {
        question: 'Brauchen wir dafür eigene Kostenexperten?',
        answer:
          'Ein Grundverständnis von Fertigungsprozessen hilft. Für komplexe Bauteile kann zusätzlich das Expertenteam von Emithran unterstützen, etwa beim Aufbau der ersten Modelle für eine neue Teilefamilie.',
      },
    ],
    related: [
      { href: '/de/supplier-intelligence', label: 'Lieferantenintelligenz', context: 'Zum Kostenmodell gehört die Frage, welche qualifizierten Lieferanten das Bauteil fertigen können.' },
      { href: '/de/bom-management-software', label: 'Stücklisten-Management', context: 'Saubere Stücklisten sind die Voraussetzung für Kostenmodelle auf Positionsebene.' },
      { href: '/german-manufacturing-cost-pilot', label: 'Pilot Deutschland–Indien (englisch)', context: 'Wie ein fokussierter Pilot mit Standortvergleich aufgebaut ist.' },
      { href: '/blog/how-to-do-should-cost-analysis', label: 'Schritt-für-Schritt-Anleitung Should-Cost (englisch)', context: 'Ausführliche Methodik mit Beispielen für den Einstieg.' },
      { href: '/downloads/should-cost-model-template.xlsx', label: 'Should-Cost-Vorlage für Excel (englisch)', context: 'Eine Vorlage, um die Methodik zunächst an einem einzelnen Bauteil zu testen.' },
    ],
  },

  'supplier-intelligence': {
    summary:
      'Lieferantenintelligenz bündelt Fähigkeiten, Zertifizierungen, Kapazitäts- und Risikosignale sowie Kostenbenchmarks in einem Lieferantenprofil. Emithran durchsucht über 72.000 Lieferantendatensätze, vergleicht Optionen in Deutschland, Europa und Indien und verknüpft jeden Lieferanten mit den Stücklistenpositionen, für die er infrage kommt oder bereits liefert.',
    walkthrough: {
      heading: 'Vom Bauteil zur qualifizierten Shortlist',
      intro:
        'Die Suche beginnt beim Bauteil, nicht beim Lieferantennamen. So entstehen Shortlists, die zu Prozess, Werkstoff und Qualitätsanforderung passen. Der Ablauf eignet sich für Neuteile ebenso wie für die Suche nach einem Zweitlieferanten für laufende Serien.',
      steps: [
        {
          title: 'Anforderung definieren',
          body: 'Prozess, Werkstoff, Abmessungen, Stückzahl und erforderliche Zertifizierungen werden aus der Stücklistenposition übernommen oder ergänzt.',
        },
        {
          title: 'Lieferanten finden',
          body: 'Supplier Radar filtert die Datensätze nach Prozessfähigkeit, Region und Zertifizierungsstatus, zum Beispiel IATF 16949, AS9100 oder NADCAP.',
        },
        {
          title: 'Risiko bewerten',
          body: 'Geografische Konzentration, Single-Source-Abhängigkeiten und Hinweise auf auslaufende Zertifikate werden je Lieferant sichtbar.',
        },
        {
          title: 'Kosten einordnen',
          body: 'Das Should-Cost-Modell des Bauteils zeigt, welches Preisniveau am jeweiligen Standort plausibel ist.',
        },
        {
          title: 'Shortlist übergeben',
          body: 'Die Shortlist geht mit Begründung in die Angebotsanfrage oder in die Qualifizierung durch das Qualitätsteam.',
        },
        {
          title: 'Leistung verfolgen',
          body: 'Nach der Vergabe fließen Qualitäts-, Liefertreue- und Kostendaten in das Lieferantenprofil zurück. So stützt sich die nächste Sourcing-Entscheidung auf tatsächliche Leistung statt auf den Eindruck aus dem letzten Gespräch.',
        },
      ],
    },
    useCases: {
      heading: 'Einsatz nach Branche',
      items: [
        {
          industry: 'Automotive-Zulieferer',
          body: 'Zweitlieferanten für Guss-, Schmiede- oder Blechteile werden mit IATF-16949-Status und Standortkosten verglichen, bevor ein PPAP-Prozess gestartet wird. Das spart Aufwand für Bemusterungen bei Lieferanten, die am Ende ohnehin nicht wettbewerbsfähig wären.',
        },
        {
          industry: 'Luft- und Raumfahrt',
          body: 'Für Spezialprozesse wie Wärmebehandlung oder zerstörungsfreie Prüfung zählt der NADCAP-Status. Er wird je Lieferant und Prozess geführt, sodass klar ist, welcher Lieferant welchen Arbeitsschritt übernehmen darf.',
        },
        {
          industry: 'Verteidigung',
          body: 'Bei Programmen mit langen Laufzeiten ist die Abhängigkeit von einzelnen Lieferanten ein Programmrisiko. Alternativen werden früh dokumentiert, damit bei einem Ausfall nicht erst die Suche beginnt.',
        },
        {
          industry: 'Maschinenbau und Präzisionsfertigung',
          body: 'Für Dreh- und Frästeile mit engen Toleranzen hilft die Fähigkeitssuche, Lieferanten jenseits des bestehenden Netzwerks zu finden. Maschinenpark, Werkstofferfahrung und Zertifizierung werden dabei gemeinsam betrachtet.',
        },
      ],
    },
    proof: {
      heading: 'Belege aus Fallstudien',
      items: [
        {
          title: 'Lkw-Rahmenlängsträger: Indien vs. Belgien',
          body: 'Standortvergleich mit 38 % geringeren Landed Costs als Grundlage für eine Sourcing-Entscheidung. Der Vergleich mit einem europäischen Standort macht die Studie für Einkaufsteams in der DACH-Region besonders relevant. Fallstudie (englisch).',
          href: '/case-studies/chassis-india-belgium',
        },
        {
          title: 'Leiterrahmen: Indien vs. Nordeuropa',
          body: 'Kostenvergleich für Längsträger mit 38 % geringeren Trägerkosten. Die Studie zeigt, wie ein Standortvergleich Indien–Nordeuropa für ein großes Strukturteil aufgebaut wird. Fallstudie (englisch).',
          href: '/case-studies/hgv-chassis',
        },
        {
          title: 'Fahrerhausstruktur: sechs Fertigungsansätze im Vergleich',
          body: 'Benchmark von sechs Herstellstrategien für eine Lkw-Kabine. Sie zeigt, wie Fertigungsansatz und Lieferantenwahl zusammen bewertet werden. Fallstudie (englisch).',
          href: '/case-studies/hgv-cab-strategy',
        },
      ],
    },
    comparison: {
      heading: 'Excel, ERP-Modul oder Emithran',
      intro:
        'Lieferantenlisten in Excel und der Lieferantenstamm im ERP decken Bestandslieferanten ab. Für die Suche nach neuen, qualifizierten Optionen fehlen dort meist die Daten. Die Tabelle zeigt, welche Fragen sich mit welchem Werkzeug beantworten lassen.',
      columns: COLUMNS,
      rows: [
        ['Suche nach Prozessfähigkeit', 'Nein', 'Nein', 'Ja, über 72.000 Datensätze'],
        ['Zertifizierungsstatus je Lieferant', 'Manuell gepflegt', 'Teilweise als Stammdatum', 'Ja, mit Hinweisen auf Ablauf'],
        ['Vergleich Deutschland, Europa, Indien', 'Separate Listen', 'Nur Bestandslieferanten', 'In einer Ansicht'],
        ['Verknüpfung mit Stücklistenpositionen', 'Nein', 'Über Einkaufsinfosätze', 'Ja, mit Risiko je Position'],
        ['Kostenbenchmark je Standort', 'Nein', 'Nein', 'Über Should-Cost-Modelle'],
        ['Single-Source-Konzentration', 'Manuelle Auswertung', 'Mit Berichten möglich', 'Direkt sichtbar'],
      ],
    },
    faqs: [
      {
        question: 'Woher stammen die Lieferantendaten?',
        answer:
          'Supplier Radar umfasst über 72.000 Lieferantendatensätze. Eigene Lieferanten und Bewertungen lassen sich ergänzen, damit Bestands- und Neulieferanten in derselben Ansicht erscheinen. Die Angaben zu Fähigkeit und Zertifizierung sollten vor einer Vergabe wie gewohnt vom Qualitätsteam bestätigt werden.',
      },
      {
        question: 'Ersetzt Lieferantenintelligenz das Lieferantenaudit?',
        answer:
          'Nein. Die Plattform bereitet Auswahl und Qualifizierung vor. Audit, Erstmusterprüfung und Freigabe bleiben Aufgabe Ihres Qualitätsteams. Die Plattform sorgt dafür, dass nur aussichtsreiche Kandidaten in diesen aufwendigen Prozess gehen.',
      },
      {
        question: 'Wie hilft die Plattform bei Single-Source-Risiken?',
        answer:
          'Single-Source-Positionen werden in der Stückliste markiert, und für diese Positionen lassen sich gezielt qualifizierte Alternativen suchen. Zusätzlich wird sichtbar, wenn mehrere Lieferanten in derselben Region konzentriert sind.',
      },
      {
        question: 'Lassen sich Lieferanten nach Qualität, Kosten und Lieferung bewerten?',
        answer:
          'Ja. Qualitäts-, Kosten- und Liefertreuedaten werden im Lieferantenprofil zusammengeführt und können für Scorecards genutzt werden. So entsteht eine gemeinsame Bewertungsgrundlage für Einkauf, Qualität und Engineering.',
      },
    ],
    related: [
      { href: '/de/should-cost-analysis-software', label: 'Should-Cost-Analyse', context: 'Kostenmodelle zeigen, welches Preisniveau ein neuer Lieferant plausibel erreichen kann.' },
      { href: '/de/defence-aerospace-manufacturing', label: 'Verteidigung und Luft- und Raumfahrt', context: 'Lieferantenqualifizierung nach AS9100 und NADCAP für anspruchsvolle Programme.' },
      { href: '/german-manufacturing-cost-pilot', label: 'Pilot Deutschland–Indien (englisch)', context: 'Ein Pilot liefert Shortlists in beiden Regionen für die geprüften Prozesse.' },
      { href: '/blog/supplier-scorecard-template', label: 'Lieferanten-Scorecard-Vorlage (englisch)', context: 'Qualität, Kosten und Lieferung strukturiert bewerten.' },
    ],
  },

  'bom-management-software': {
    summary:
      'Stücklisten-Management-Software führt Teilenummern, Mengen, Werkstoffe, Spezifikationen, Kosten und Lieferanten in einem System. Emithran prüft importierte Stücklisten automatisch auf Dubletten, Lücken und Einheitenfehler, verknüpft jede Position mit Should-Cost- und Lieferantendaten und strebt für validierte Programme 99,4 % Stücklistengenauigkeit an.',
    walkthrough: {
      heading: 'Von der Rohstückliste zur belastbaren Datenbasis',
      intro:
        'Die meisten Stücklisten kommen als Excel-Export aus Konstruktion oder ERP. Der Weg zur belastbaren Stückliste umfasst sechs Schritte. Für einen Pilot genügt eine repräsentative Baugruppe, an der sich typische Fehlerbilder und Kostentreiber zeigen lassen.',
      steps: [
        {
          title: 'Import',
          body: 'Die Stückliste wird als Excel- oder CSV-Datei importiert. Spalten wie Teilenummer, Menge, Einheit und Werkstoff werden zugeordnet.',
        },
        {
          title: 'Validierung',
          body: 'Die Prüfung markiert Dubletten, fehlende Pflichtangaben, widersprüchliche Spezifikationen und Einheitenfehler, sortiert nach Schweregrad.',
        },
        {
          title: 'Bereinigung',
          body: 'Engineering und Einkauf klären die markierten Positionen gemeinsam. Jede Änderung wird mit Bearbeiter und Zeitpunkt protokolliert.',
        },
        {
          title: 'Anreicherung',
          body: 'Positionen werden mit Should-Cost-Modellen, aktuellen Lieferanten und Risikohinweisen verknüpft.',
        },
        {
          title: 'Auswertung',
          body: 'Kosten werden nach Baugruppe und Programm aufsummiert. Die größten Kostentreiber und Single-Source-Positionen werden sichtbar.',
        },
        {
          title: 'Änderungen nachführen',
          body: 'Neue Konstruktionsstände werden erneut importiert und gegen den vorherigen Stand geprüft. Geänderte Positionen sind markiert, damit Einkauf und Kalkulation nur die betroffenen Teile neu bewerten müssen.',
        },
      ],
    },
    useCases: {
      heading: 'Einsatz nach Branche',
      items: [
        {
          industry: 'Automotive-Zulieferer',
          body: 'Bei Variantenstücklisten und Änderungsständen verhindert die Validierung, dass veraltete Positionen in Angebotsanfragen oder Kalkulationen landen. Gerade in der Angebotsphase für neue Plattformen spart das Rückfragen und Nachkalkulationen.',
        },
        {
          industry: 'Luft- und Raumfahrt',
          body: 'Mehrstufige Baugruppen mit Konfigurationsständen erfordern ein lückenloses Änderungsprotokoll, das in Audits vorgelegt werden kann. Jede Position bleibt mit Werkstoff, Spezifikation und Lieferant verknüpft.',
        },
        {
          industry: 'Verteidigung',
          body: 'Lange Programmlaufzeiten und Obsoleszenzrisiken machen es wichtig, für jede Position Lieferant und Ersatzoptionen zu kennen. Abkündigungen lassen sich so schneller auf betroffene Baugruppen zurückführen.',
        },
        {
          industry: 'Maschinenbau und Präzisionsfertigung',
          body: 'Viele Kaufteile und Normteile führen schnell zu Dubletten unter verschiedenen Teilenummern. Die Bereinigung bündelt Bedarfe für bessere Konditionen.',
        },
      ],
    },
    proof: {
      heading: 'Belege aus Fallstudien',
      items: [
        {
          title: 'Rückspiegel: Stücklisten-Should-Cost über fünf Prozesse',
          body: 'Kostenmodell auf Basis der Stückliste mit Ergebnis von 0,96 $ pro Einheit. Die Studie zeigt, wie jede Position einem Fertigungsprozess zugeordnet und einzeln bewertet wird. Fallstudie (englisch).',
          href: '/case-studies/rear-view-mirror',
        },
        {
          title: 'Elektronik- und Leiterplatten-Teardown',
          body: 'Should-Cost-Teardown für Radarsensor, Batteriekühlung und Kabelbaum; Leiterplatte von 19,89 $ auf 8,07 $. Elektronikstücklisten mit vielen Kaufteilen profitieren besonders von sauberer Struktur. Fallstudie (englisch).',
          href: '/case-studies/electronics-teardown',
        },
        {
          title: 'LCV-Hinterachse: 244 $ pro Baugruppe',
          body: 'Kostenaufschlüsselung einer kompletten Baugruppe auf Positionsebene. Sie zeigt, wie sich Einzelkosten zu einem Baugruppenpreis aufsummieren. Fallstudie (englisch).',
          href: '/case-studies/rear-axle-should-cost',
        },
      ],
    },
    comparison: {
      heading: 'Excel, ERP-Modul oder Emithran',
      intro:
        'Excel ist flexibel, aber fehleranfällig. Das ERP verwaltet freigegebene Stücklisten für Disposition und Fertigung. Emithran setzt davor an: bei Prüfung, Kosten und Lieferanten. Die Systeme ergänzen sich, statt miteinander zu konkurrieren.',
      columns: COLUMNS,
      rows: [
        ['Automatische Prüfung auf Dubletten und Lücken', 'Nein', 'Teilweise über Pflichtfelder', 'Ja, nach Schweregrad sortiert'],
        ['Should-Cost je Position', 'Manuell', 'Nein', 'Ja'],
        ['Lieferantenrisiko je Position', 'Nein', 'Nein', 'Ja'],
        ['Kostenrollup nach Baugruppe', 'Mit Formeln', 'Ja, auf Basis von Standardkosten', 'Ja, auf Basis von Should-Cost'],
        ['Änderungsprotokoll', 'Nein', 'Ja', 'Ja, je Position'],
        ['Import aus Excel oder CSV', 'Nicht zutreffend', 'Über Schnittstellen', 'Ja, API verfügbar'],
        ['Gemeinsame Bearbeitung durch Engineering, Einkauf und Qualität', 'Versionskonflikte zwischen Dateikopien', 'Nach Berechtigungskonzept des ERP', 'Ja, rollenbasiert mit Kommentaren'],
        ['Vergleich zweier Konstruktionsstände', 'Manuell mit Formeln', 'Über Änderungsdienst', 'Ja, geänderte Positionen markiert'],
      ],
    },
    faqs: [
      {
        question: 'Ersetzt Emithran das Stücklistenmodul im ERP oder PLM?',
        answer:
          'Nein. Emithran arbeitet neben ERP und PLM und konzentriert sich auf Prüfung, Kostentransparenz und Lieferantendaten. Freigabe und Disposition bleiben in Ihren bestehenden Systemen. Stücklisten werden aus Excel oder CSV übernommen, für weitere Anbindungen steht eine API zur Verfügung.',
      },
      {
        question: 'Was bedeutet 99,4 % Stücklistengenauigkeit?',
        answer:
          'Das ist der Zielwert für validierte Programme: Der Anteil der Positionen ohne Fehler bei Teilenummer, Menge, Einheit und Spezifikation nach Abschluss der Validierung. Wie schnell ein Programm diesen Wert erreicht, hängt von der Ausgangsqualität der Daten ab.',
      },
      {
        question: 'Wie groß dürfen Stücklisten sein?',
        answer:
          'Auch umfangreiche, mehrstufige Stücklisten lassen sich verarbeiten. Für einen Pilot empfehlen wir eine repräsentative Baugruppe statt der gesamten Produktstruktur. So lassen sich Ergebnisse schnell prüfen, bevor weitere Baugruppen folgen.',
      },
      {
        question: 'Wer kann die Stückliste bearbeiten?',
        answer:
          'Rechte werden nach Rolle vergeben. Engineering, Einkauf und Qualität arbeiten an derselben Stückliste, jede Änderung wird mit Bearbeiter und Zeitpunkt protokolliert. Das Protokoll steht für interne Reviews und Audits zur Verfügung.',
      },
    ],
    related: [
      { href: '/de/should-cost-analysis-software', label: 'Should-Cost-Analyse', context: 'Jede bereinigte Position lässt sich mit einem Kostenmodell verknüpfen.' },
      { href: '/de/manufacturing-intelligence', label: 'Fertigungsintelligenz', context: 'Wie Stückliste, Kosten und Lieferanten in einem Datenmodell zusammenhängen.' },
      { href: '/bom-management-software', label: 'BOM Management Software (englisch)', context: 'Die englische Produktseite mit weiteren Details.' },
      { href: '/blog/what-is-bom-management', label: 'Was ist BOM-Management? (englisch)', context: 'Grundlagen und bewährte Vorgehensweisen.' },
    ],
  },

  'manufacturing-intelligence': {
    summary:
      'Fertigungsintelligenz bedeutet, dass Stücklisten, Kostenmodelle und Lieferantendaten in einem verbundenen System liegen. Emithran verknüpft sieben Module über diese gemeinsame Datenbasis, sodass sich jede Sourcing- oder Engineering-Entscheidung bis zur zugrunde liegenden Position, Kostenannahme und Lieferantenbewertung zurückverfolgen lässt.',
    walkthrough: {
      heading: 'Wie die sieben Module zusammenarbeiten',
      intro:
        'Ein typischer Ablauf führt von der Stückliste bis zur Lieferung. Jedes Modul greift auf dieselben Daten zu, statt eigene Kopien zu pflegen. Das verhindert, dass Einkauf, Engineering und Qualität mit unterschiedlichen Ständen derselben Stückliste arbeiten.',
      steps: [
        {
          title: 'Stückliste prüfen (BOM Intelligence)',
          body: 'Die Stückliste wird importiert und validiert. Sie bildet die Grundlage für alle folgenden Schritte.',
        },
        {
          title: 'Kosten modellieren (Should-Cost-Analyse)',
          body: 'Für die kostenrelevanten Positionen entstehen Bottom-up-Modelle mit Prozessroute und Kostentreibern.',
        },
        {
          title: 'Alternativen bewerten (VAVE Studio)',
          body: 'Design- und Werkstoffalternativen werden nach Kostenwirkung bewertet, bevor sie in die Konstruktion zurückgehen.',
        },
        {
          title: 'Lieferanten auswählen (Supplier Radar und Quality Guard)',
          body: 'Qualifizierte Lieferanten werden gesucht, Zertifikate und Qualitätsdaten geprüft.',
        },
        {
          title: 'Anlauf und Lieferung verfolgen (Launch Tracker und Shipment Hub)',
          body: 'Offene Punkte im Anlauf und der Status von Sendungen bleiben mit dem Bauteil verknüpft.',
        },
        {
          title: 'Erkenntnisse zurückführen',
          body: 'Tatsächliche Preise, Qualitätsdaten und Lieferzeiten fließen zurück in Kostenmodelle und Lieferantenprofile. Die nächste Kalkulation beginnt damit auf einer besseren Datenbasis als die vorherige.',
        },
      ],
    },
    useCases: {
      heading: 'Einsatz nach Branche',
      items: [
        {
          industry: 'Automotive-Zulieferer',
          body: 'Kostenziele aus der Angebotsphase lassen sich bis in die Serienvergabe verfolgen, ohne dass Daten zwischen Kalkulation, Einkauf und Qualität neu erfasst werden. Abweichungen vom Zielpreis werden sichtbar, solange noch Spielraum für Gegenmaßnahmen besteht.',
        },
        {
          industry: 'Luft- und Raumfahrt',
          body: 'Programmreviews verlangen nachvollziehbare Entscheidungen. Die Verknüpfung von Stückliste, Kosten und Lieferant liefert diese Nachvollziehbarkeit, ohne dass Unterlagen für jedes Review neu zusammengestellt werden müssen.',
        },
        {
          industry: 'Verteidigung',
          body: 'Zugriffe lassen sich nach Programm und Rolle einschränken, während Kosten- und Lieferantendaten trotzdem in einem Modell zusammenlaufen.',
        },
        {
          industry: 'Maschinenbau und Präzisionsfertigung',
          body: 'Bei vielen Varianten und kleinen Losgrößen reduziert eine gemeinsame Datenbasis den Abstimmungsaufwand zwischen Konstruktion und Einkauf. Wiederkehrende Teilefamilien werden einmal modelliert und danach konsistent bewertet.',
        },
      ],
    },
    proof: {
      heading: 'Belege aus Fallstudien',
      items: [
        {
          title: 'Luftfahrt-DC-DC-Wandler: 22 % geringere Stückkosten durch VAVE',
          body: 'Wertanalyse in Verbindung mit Should-Cost. Die Studie zeigt, wie Designalternativen über ihre Kostenwirkung bewertet werden, bevor die Konstruktion sie umsetzt. Fallstudie (englisch).',
          href: '/case-studies/dc-dc-converter',
        },
        {
          title: 'Abgasanlage: Titan vs. Edelstahl',
          body: 'Werkstoffentscheidung mit 1,3 Mio. £ Einsparung pro Jahr. Ein Beispiel dafür, wie Engineering-Entscheidung und Kostenmodell zusammenhängen. Fallstudie (englisch).',
          href: '/case-studies/exhaust-system',
        },
        {
          title: 'Lkw-Rahmenlängsträger: Indien vs. Belgien',
          body: 'Standortvergleich mit 38 % geringeren Landed Costs. Kosten- und Lieferantendaten wurden hier gemeinsam für die Standortentscheidung genutzt. Fallstudie (englisch).',
          href: '/case-studies/chassis-india-belgium',
        },
      ],
    },
    comparison: {
      heading: 'Excel, ERP-Modul oder Emithran',
      intro:
        'Fertigungsintelligenz ersetzt weder Tabellen noch ERP vollständig. Sie verbindet die Daten, die dort getrennt liegen. Die Tabelle vergleicht die drei Ansätze anhand der Fähigkeiten, die für Kosten- und Sourcing-Entscheidungen zählen.',
      columns: COLUMNS,
      rows: [
        ['Gemeinsames Datenmodell für Stückliste, Kosten, Lieferanten', 'Nein, verteilte Dateien', 'Teilweise, transaktionsorientiert', 'Ja'],
        ['Should-Cost-Modellierung', 'Manuell', 'Nein', 'Ja'],
        ['Lieferantensuche nach Fähigkeit', 'Nein', 'Nein', 'Ja, über 72.000 Datensätze'],
        ['Wertanalyse mit Kostenwirkung', 'Manuell', 'Nein', 'Ja, über VAVE Studio'],
        ['Rückverfolgbarkeit von Entscheidungen', 'Gering', 'Für Transaktionen', 'Bis zur Kostenannahme'],
        ['Zusammenspiel mit ERP und PLM', 'Export und Import', 'Ist das ERP', 'Arbeitet daneben, API verfügbar'],
        ['Standortvergleich Deutschland–Indien', 'Separate Tabellen je Region', 'Nicht vorgesehen', 'Im selben Kostenmodell'],
        ['Anlauf- und Sendungsverfolgung je Bauteil', 'Separate Listen', 'Teilweise über Bestellungen', 'Über Launch Tracker und Shipment Hub'],
      ],
    },
    faqs: [
      {
        question: 'Müssen wir alle sieben Module einsetzen?',
        answer:
          'Nein. Viele Teams beginnen mit einem Modul, zum Beispiel Should-Cost oder BOM Intelligence, und erweitern später. Der Nutzen der gemeinsamen Datenbasis wächst mit jedem weiteren Modul, weil Daten nur einmal erfasst und dann überall genutzt werden.',
      },
      {
        question: 'Wie werden Daten aus bestehenden Systemen übernommen?',
        answer:
          'Stücklisten werden aus Excel oder CSV importiert. Für weitere Anbindungen steht eine API zur Verfügung. Emithran arbeitet neben ERP und PLM und ersetzt diese Systeme nicht.',
      },
      {
        question: 'Welche Rolle spielt KI in der Plattform?',
        answer:
          'KI unterstützt unter anderem bei der Prüfung von Stücklisten, der Zuordnung von Prozessen und der Lieferantensuche. Die Annahmen bleiben sichtbar und lassen sich von Fachleuten überprüfen und anpassen. Die Entscheidung bleibt beim Team, nicht beim Algorithmus.',
      },
      {
        question: 'Wie schnell sieht ein Team erste Ergebnisse?',
        answer:
          'Ein fokussierter Pilot lässt sich in etwa fünf Tagen aufsetzen, sobald Stückliste, Zeichnungen und eine konkrete Fragestellung vorliegen. Typische Fragestellungen sind eine Preisverhandlung, eine Verlagerungsprüfung oder ein Zweitlieferant.',
      },
    ],
    related: [
      { href: '/de', label: 'Emithran auf Deutsch', context: 'Überblick über alle Module und den Pilot.' },
      { href: '/de/bom-management-software', label: 'Stücklisten-Management', context: 'Der Ausgangspunkt für die gemeinsame Datenbasis.' },
      { href: '/de/supplier-intelligence', label: 'Lieferantenintelligenz', context: 'Wie Lieferantendaten mit Stückliste und Kosten verknüpft werden.' },
      { href: '/blog/manufacturing-intelligence-pillar', label: 'Manufacturing Intelligence Leitfaden (englisch)', context: 'Ausführlicher Leitfaden zum Konzept und zu Anwendungsfällen.' },
    ],
  },

  'defence-aerospace-manufacturing': {
    summary:
      'Für Verteidigungs- und Luftfahrtprogramme verbindet Emithran Lieferantenqualifizierung nach AS9100 und NADCAP, Should-Cost-Modelle für kleine Losgrößen und Sonderwerkstoffe sowie mehrstufige Stücklisten mit Konfigurationskontrolle. Zugriffe lassen sich nach Programm und Rolle einschränken, damit sensible Bauteil- und Lieferantendaten innerhalb klarer Grenzen bleiben.',
    walkthrough: {
      heading: 'Ablauf für ein Luftfahrt- oder Verteidigungsbauteil',
      intro:
        'Bei Programmen mit kleinen Stückzahlen und strengen Qualitätsanforderungen verschieben sich die Kostentreiber. Der Ablauf berücksichtigt das von Anfang an. Er gilt für Einzelteile ebenso wie für Baugruppen mit mehreren Fertigungsstufen und Spezialprozessen.',
      steps: [
        {
          title: 'Programm und Zugriffe anlegen',
          body: 'Bauteile, Stücklisten und Lieferanten werden einem Programm zugeordnet. Zugriffsrechte werden nach Rolle vergeben.',
        },
        {
          title: 'Mehrstufige Stückliste prüfen',
          body: 'Baugruppen werden mit Konfigurationsständen validiert. Änderungen werden über Baugruppengrenzen hinweg nachverfolgt.',
        },
        {
          title: 'Kosten für kleine Losgrößen modellieren',
          body: 'Rüst-, Prüf- und Dokumentationsaufwand wird auf kleine Stückzahlen verteilt. Buy-to-Fly-Verhältnis und Zerspanbarkeit von Titan oder Inconel fließen in das Modell ein.',
        },
        {
          title: 'Lieferanten qualifizieren',
          body: 'AS9100- und NADCAP-Status werden je Lieferant und Spezialprozess geprüft, ergänzt um Kapazität und Audit-Historie.',
        },
        {
          title: 'Entscheidung dokumentieren',
          body: 'Kostenmodell, Lieferantenbewertung und Begründung werden zusammen abgelegt und stehen für Programm- und Kundenreviews bereit.',
        },
        {
          title: 'Lernkurve berücksichtigen',
          body: 'Für Folgelose wird der Lerneffekt in Fertigung und Prüfung berücksichtigt. So lässt sich bewerten, ob Preisangebote für spätere Lose zur erwarteten Kostenentwicklung passen.',
        },
      ],
    },
    useCases: {
      heading: 'Einsatz nach Branche',
      items: [
        {
          industry: 'Luft- und Raumfahrt',
          body: 'Strukturteile aus Titan und Aluminium, Triebwerkskomponenten aus Nickelbasislegierungen und Avionikbaugruppen haben eigene Kostentreiber, die im Modell getrennt sichtbar sind.',
        },
        {
          industry: 'Verteidigung',
          body: 'Bei wenigen qualifizierten Anbietern ersetzt ein unabhängiges Kostenmodell teilweise den fehlenden Wettbewerb und stützt die Preisprüfung. Die Annahmen sind dokumentiert und lassen sich im Gespräch mit dem Auftragnehmer Punkt für Punkt durchgehen.',
        },
        {
          industry: 'Raumfahrt',
          body: 'Sehr kleine Stückzahlen und hoher Prüfaufwand machen Serienkalkulationen unbrauchbar. Das Modell rechnet mit den tatsächlichen Losgrößen und weist Qualifikations- und Testaufwand getrennt aus.',
        },
        {
          industry: 'Automotive-Zulieferer mit Verteidigungsgeschäft',
          body: 'Zulieferer, die neben Serienteilen auch Verteidigungsprogramme beliefern, nutzen dieselbe Methodik mit unterschiedlichen Annahmen je Programm. Serien- und Programmdaten bleiben dabei über Zugriffsrechte getrennt.',
        },
      ],
    },
    proof: {
      heading: 'Belege aus Fallstudien',
      items: [
        {
          title: 'Luftfahrt-DC-DC-Wandler: 22 % geringere Stückkosten durch VAVE',
          body: 'Wertanalyse an einer Leistungselektronik-Baugruppe für die Luftfahrt. Die Studie zeigt, dass auch bei qualifizierten Luftfahrtbaugruppen Kostenpotenzial in Design und Bauteilauswahl liegt. Fallstudie (englisch).',
          href: '/case-studies/dc-dc-converter',
        },
        {
          title: 'Elektronik- und Leiterplatten-Teardown',
          body: 'Should-Cost-Teardown von Elektronikbaugruppen; Leiterplatte von 19,89 $ auf 8,07 $. Die Methodik lässt sich auf Elektronik in Verteidigungs- und Luftfahrtsystemen übertragen. Fallstudie (englisch).',
          href: '/case-studies/electronics-teardown',
        },
        {
          title: 'Abgasanlage: Titan vs. Edelstahl',
          body: 'Werkstoffvergleich mit Titan als Kostentreiber; 1,3 Mio. £ Einsparung pro Jahr. Die Kostenlogik für Titan ist für Luftfahrtbauteile direkt relevant. Fallstudie (englisch).',
          href: '/case-studies/exhaust-system',
        },
      ],
    },
    comparison: {
      heading: 'Excel, ERP-Modul oder Emithran',
      intro:
        'Luftfahrt- und Verteidigungsprogramme stellen besondere Anforderungen an Kostenlogik, Qualifizierung und Nachvollziehbarkeit. Die Tabelle zeigt, wo die üblichen Werkzeuge an Grenzen stoßen.',
      columns: COLUMNS,
      rows: [
        ['Kostenmodelle für kleine Losgrößen', 'Manuell', 'Standardkosten, oft serienorientiert', 'Ja, mit Rüst- und Prüfaufwand je Los'],
        ['Sonderwerkstoffe und Spezialprozesse', 'Eigene Pflege', 'Als Stammdaten', 'Im Prozessmodell abgebildet'],
        ['AS9100- und NADCAP-Status je Lieferant', 'Manuelle Liste', 'Teilweise als Stammdatum', 'Ja, je Spezialprozess'],
        ['Mehrstufige Stücklisten mit Konfigurationsständen', 'Fehleranfällig', 'Ja', 'Ja, mit Kosten und Lieferanten verknüpft'],
        ['Zugriff nach Programm und Rolle', 'Dateiberechtigungen', 'Ja', 'Ja'],
        ['Dokumentation für Programmreviews', 'Manuell zusammengestellt', 'Transaktionsdaten', 'Entscheidung mit Begründung abgelegt'],
        ['Lerneffekte für Folgelose', 'Eigene Formeln', 'Nicht vorgesehen', 'Im Kostenmodell berücksichtigt'],
        ['Standortvergleich Europa–Indien', 'Separate Tabellen', 'Nicht vorgesehen', 'Im selben Modell mit eigenen Annahmen'],
      ],
    },
    faqs: [
      {
        question: 'Warum funktionieren Serienkalkulationen in der Luftfahrt schlecht?',
        answer:
          'Bei kleinen Losgrößen dominieren Rüsten, Erstmusterprüfung, Dokumentation und Werkstoffverlust. Ein Modell mit Großserienannahmen unterschätzt diese Anteile deutlich. Das führt zu unrealistischen Zielpreisen und belastet die Verhandlung mit dem Lieferanten.',
      },
      {
        question: 'Was ist das Buy-to-Fly-Verhältnis?',
        answer:
          'Es setzt das eingekaufte Rohmaterialgewicht ins Verhältnis zum Gewicht des fertigen Bauteils. Bei Titan- und Inconel-Teilen ist es ein zentraler Kostentreiber, weil teures Material zerspant wird und lange Bearbeitungszeiten entstehen. Endkonturnahe Halbzeuge wie Schmiedeteile können es senken.',
      },
      {
        question: 'Unterstützt Emithran Exportkontroll-Vorgaben wie ITAR?',
        answer:
          'Zugriffe lassen sich nach Programm und Rolle einschränken. Ob dies für die Exportkontroll-Anforderungen Ihres Programms ausreicht, sollte mit Ihrer Exportkontrolle und in der Demo konkret geprüft werden.',
      },
      {
        question: 'Ersetzt die Plattform die Lieferantenfreigabe durch das Qualitätsmanagement?',
        answer:
          'Nein. Emithran bereitet Qualifizierung und Auswahl vor. Die formale Freigabe nach Ihren Verfahren bleibt beim Qualitätsmanagement. Die Plattform stellt die dafür nötigen Informationen gebündelt bereit.',
      },
    ],
    related: [
      { href: '/de/supplier-intelligence', label: 'Lieferantenintelligenz', context: 'Lieferantensuche und Risikobewertung für qualifizierte Alternativen.' },
      { href: '/de/should-cost-analysis-software', label: 'Should-Cost-Analyse', context: 'Die Methodik hinter den Kostenmodellen, vom Prozessschritt bis zur Verhandlungsunterlage, ausführlich auf Deutsch erklärt.' },
      { href: '/aerospace-cost-engineering', label: 'Aerospace Cost Engineering (englisch)', context: 'Kostenmodellierung für Luftfahrtbauteile im Detail.' },
      { href: '/blog/nadcap-accreditation-explained', label: 'NADCAP-Akkreditierung erklärt (englisch)', context: 'Was NADCAP für die Auswahl von Lieferanten für Spezialprozesse bedeutet.' },
      { href: '/blog/buy-to-fly-ratio', label: 'Buy-to-Fly-Verhältnis (englisch)', context: 'Warum der Werkstoffeinsatz die Kosten von Luftfahrtteilen bestimmt.' },
    ],
  },
}
