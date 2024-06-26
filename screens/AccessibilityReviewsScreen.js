import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";

import AppText from "../components/AppText";
import BackButton from "../components/BackButton";
import colors from "../config/colors";
import AccessibilityReview from "../components/AccessibilityReview";
import reviewsApi from "../api/reviews";
import useApi from "../hooks/useApi";
import HeaderContainer from "../components/HeaderContainer";
import ContentContainer from "../components/ContentContainer";
import ReviewModal from "../components/ReviewModal";
import AppButton from "../components/AppButton";
import SubmitReviewModal from "../components/SubmitReviewModal";
import ListItemSeparator from "../components/ListItemSeparator";
import CheckBox from "@react-native-community/checkbox";

function AccessibilityReviewsScreen({ route }) {
  const { venue, accessibilityItem } = route.params;
  const getReviewsApi = useApi(reviewsApi.getReviews);

  const [selectedReview, setSelectedReview] = useState({});
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isSubmitReviewModalVisible, setIsSubmitReviewModalVisible] =
    useState(false);

  const handleReviewPress = (review) => {
    setSelectedReview(review);
    setIsReviewModalVisible(true);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await getReviewsApi.request(venue._id, accessibilityItem.name);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.light }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          rowGap: 5,
        }}
      >
        <HeaderContainer
          title={accessibilityItem.name}
          button={<BackButton color={colors.white} size={40} />}
        >
          <View style={styles.container}>
            <AppText style={styles.subTitle} numberOfLines={1}>
              Reviews for {venue.name}
            </AppText>
            <AppText
              style={{ fontSize: 12, marginBottom: 5 }}
              accessibilityLabel="Tap reviews for full info"
            >
              💡 Tap reviews to read full info
            </AppText>
            {getReviewsApi.data.length > 0 ? (
              getReviewsApi.data.map((review) => (
                <>
                  <AccessibilityReview
                    review={review}
                    style={{ width: "100%" }}
                    onPress={() => handleReviewPress(review)}
                    key={review._id}
                  />
                </>
              ))
            ) : (
              <>
                <ListItemSeparator />
                <AppText style={{ marginTop: 10 }}>
                  No reviews to display.
                </AppText>
              </>
            )}
          </View>
        </HeaderContainer>
        <ContentContainer style={{ paddingBottom: 15 }}>
          <AppText
            style={{ color: colors.primary, fontSize: 20, marginBottom: 5 }}
          >
            Something Missing?
          </AppText>
          <AppText style={{ fontSize: 15 }}>
            As a community supported application, we rely on user submissions to
            provide venue accessibility information. If you'd like to report
            something about this venue, please click the button below to answer
            a few short questions on your experience at {venue.name}.
          </AppText>
          <AppButton
            title="📖 Submit a Review"
            style={{ marginTop: 10 }}
            onPress={() => setIsSubmitReviewModalVisible(true)}
          />
        </ContentContainer>
      </ScrollView>
      <ReviewModal
        isVisible={isReviewModalVisible}
        setIsVisible={setIsReviewModalVisible}
        review={selectedReview}
      />
      <SubmitReviewModal
        isModalVisible={isSubmitReviewModalVisible}
        setIsModalVisible={setIsSubmitReviewModalVisible}
        venue={venue}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
