import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import AppText from "../components/AppText";
// import reviews from "../mockdata/reviews";
import BackButton from "../components/BackButton";
import colors from "../config/colors";
import AccessibilityReview from "../components/AccessibilityReview";

function AccessibilityReviewsScreen({ route }) {
  const { venue, accessibilityItem } = route.params;

  const [accessibilityReviews, setAccessibilityReviews] = useState([]);

  // useEffect(() => {
  //   const aReviews = reviews.filter(
  //     (review) =>
  //       review.venueId === venue.id &&
  //       review.accessibilityId === accessibilityItem.id
  //   );
  //   if (aReviews.length > 0) {
  //     setAccessibilityReviews(aReviews[0].reviews);
  //   }
  // }, [venue.id, accessibilityItem.id]);

  return (
    <SafeAreaView>
      {/* <BackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <AppText
          style={styles.title}
          accessibilityRole="header"
          numberOfLines={1}
        >
          {accessibilityItem.name}
        </AppText>
        <AppText style={styles.subTitle} numberOfLines={1}>
          Reviews for {venue.name}
        </AppText>
        <AppText style={{ fontSize: 20 }}></AppText>
        {accessibilityReviews.length > 0 ? (
          accessibilityReviews.map((review, index) => (
            <AccessibilityReview review={review} key={index} />
          ))
        ) : (
          <AppText>No reviews to display.</AppText>
        )}
      </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 45,
    width: "100%",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 5,
    color: colors.primary,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
});

export default AccessibilityReviewsScreen;
