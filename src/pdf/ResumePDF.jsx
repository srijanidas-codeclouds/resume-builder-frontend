import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    size: "A4",
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.profileInfo.fullName}</Text>
        <Text>{data.profileInfo.designation}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Summary</Text>
        <Text>{data.profileInfo.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Skills</Text>
        <Text>{data.skills.map((s) => s.name).join(", ")}</Text>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
